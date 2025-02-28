import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Table, Tag, Typography, Input, Form, Button, Row, Col, Card, Statistic, Divider, message } from 'antd';
import { ExclamationCircleOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation,useNavigate,Link } from 'react-router-dom';
import { notification,Spin } from 'antd';
const { Text } = Typography;
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const EditableTable = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { data: initialData } = location.state || { data: [] };
  console.log("data",initialData)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    
    if (initialData && initialData.length > 0) {
     
      const validatedData = initialData.map((row, index) => ({
        ...row,
        key: index.toString(),
        ...validateRow(row),
      }));
      setData(validatedData);
      form.setFieldsValue(validatedData);
    }
  }, [initialData, form]);

  const ticketLines = data.length;
  const errorEntries = data.filter((item) => !item.isValid);

  const validateRow = (row) => {
    const messages = [];
    let valid = true;

    if (!row['First Name']) {
      messages.push('First Name cannot be empty.');
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(row['First Name'])) {
      messages.push('First Name should contain only letters.');
      valid = false;
    }
  
    if (!row['Last Name']) {
      messages.push('Last Name cannot be empty.');
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(row['Last Name'])) {
      messages.push('Last Name should contain only letters.');
      valid = false;
    }
    if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(row['Phone Number'])) {
      messages.push('Invalid phone number format.');
      valid = false;
    }

    if (row['Remaining Draws'] === undefined || row['Remaining Draws'] === '') {
      messages.push('Remaining Draws cannot be empty.');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row['Email'])) {
      messages.push('Invalid email format.');
      valid = false;
    }

    return { isValid: valid, validationMessages: messages };
  };

  const handleFieldChange = useCallback(
    debounce((key, dataIndex, value) => {
      const updatedRow = { ...data.find(row => row.key === key), [dataIndex]: value };
      const validatedRow = { ...updatedRow, ...validateRow(updatedRow) };

      setData((prevData) => 
        prevData.map((row) => 
          row.key === key ? validatedRow : row
        )
      );
    }, 1200),
    [data]
  );

  const columns = [
    { title: 'First Name', dataIndex: 'First Name', key: 'firstName', editable: true, width: 150 },
    { title: 'Last Name', dataIndex: 'Last Name', key: 'lastName', editable: true, width: 150 },
    { title: 'Phone Number', dataIndex: 'Phone Number', key: 'phoneNo', editable: true, width: 200 },
    { title: 'Ticket Number', dataIndex: 'Ticket Number', key: 'ticketNo', editable: true, width: 150 },
    { title: 'Remaining Draws', dataIndex: 'Remaining Draws', key: 'remainingDraws', editable: true, width: 150 },
    { title: 'Email', dataIndex: 'Email', key: 'email', editable: true, width: 200 },
    {
      title: 'Validation Status',
      key: 'isValid',
      render: (_, record) => record.isValid ? <Tag color="green">Valid</Tag> : <Tag color="red">Invalid</Tag>,
      width: 150,
    },
    {
      title: 'Validation Messages',
      key: 'validationMessages',
      render: (_, record) => (
        record.validationMessages.length > 0 ? (
          <ul>{record.validationMessages.map((msg, index) => <li key={index}>{msg}</li>)}</ul>
        ) : <span>No validation errors</span>
      ),
      width: 250,
    },
  ];

  const EditableCell = ({ title, editable, children, record, dataIndex, ...restProps }) => {
    const inputRef = useRef(null);

    return (
      
      <td {...restProps}>
        {editable ? (
          <Form.Item
            name={[record.key, dataIndex]}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please input ${title}` }]}
          >
            <Input
              ref={inputRef}
              defaultValue={record[dataIndex]}
              onChange={e => handleFieldChange(record.key, dataIndex, e.target.value)}
            />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const handleSave = async () => {
    setLoading(true);
    if (errorEntries.length > 0) {
      setLoading(false);
      notification.error({
        message: 'Submission Error',
        description: 'Please correct all errors before submitting.',
      });
      
      return;
    }

    try {
      const memberList = data.map(row => ({
        firstName: row['First Name'],
        lastName: row['Last Name'],
        email: row['Email'],
        phoneNumber: row['Phone Number'],
        ticketNumber: row['Ticket Number'] || '', // Defaults to empty string if ticketNumber is missing
        remainingDraws: row['Remaining Draws'] // Ensure matching casing with backend requirements
      }));
      console.log("data",memberList)
      const response = await axios.post('http://localhost:3000/raffle/tickets/save',  memberList );
      if (response.status === 201) {
        setLoading(false);
        message.success('Raffle tickets were imported successfully');
        navigate('/');
        // setData(response.data.response); // Assuming response.data.response is the updated data
      } else {
        setLoading(false);
        notification.error({
          message: 'Validation Error',
          description: 'Validation failed. Please check your input.',
        });
        
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Error Occurred',
        description: 'There was an error in validation or submission. Please try again.',
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Spin spinning={loading} tip="Validating..." size="large" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',zIndex:1 }}></Spin>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          rowKey="key"
          scroll={{ x: 1500, y: 400 }}
        />
      </Form>
      <Divider />
      <div className='d-flex '>
        <div>
        <Link to='/ticket'>
        <Button
            color="default" variant="outlined"
            style={{ marginTop: 16 }}
          >
            Back
          </Button>
          </Link>
        </div>
        <div    className='ms-auto'>
        <Button
   
        type="primary"
        onClick={handleSave}
        loading={loading}
        disabled={errorEntries.length > 0 || data.length === 0}
        style={{ marginTop: 16 }}
        
      >
        Upload  Members
      </Button>

        </div>
     
      </div>
      
    </div>
  );
};

export default EditableTable;


