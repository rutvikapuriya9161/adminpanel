import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { ErrorMessage, Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';


function Medicines(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        price: yup.number().required("please enter price"),
        quantity: yup.string().required("please enter quantity"),
        expiry: yup.string().required("please enter expiry"),
    });

    const handleInsert = (values) => {
        let localData = localStorage.getItem("madicines");

        let id = Math.floor(Math.random()*1000);

        // console.log(id, values);

        let data = {
            id: "id",
            ...values
        }

        if (localData === null) {
            localStorage.setItem("medicines", JSON.stringify( data ));
        } else {
            localData.push(data);
            localStorage.setItem("medicines", JSON.stringify(data));
        }

        loadData();
        handleClose();
        formik.resetForm();

    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'price', headerName: 'Price', width: 170 },
        { field: 'quantity', headerName: 'Quantity', width: 170 },
        { field: 'expiry', headerName: 'Expiry', width: 170 },
    ];

    const localData = () => {
        let localData = JSON.parse(localStorage.getItem("madicines"));
        setData(localData);
    }

    useEffect (
        () =>{
            loadData();
        },
    [])

    const { handleBlur, handleChange, handleSubmit, errors, touched } = formik;
        let loadData = () => {

        }

    return (
        <div>
            <h1>Medicines</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
                </Button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add Medicine</DialogTitle>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    name="name"
                                    label="Medicine Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="price"
                                    label="Medicine price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="quantity"
                                    label="Medicine quantity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                                <TextField
                                    margin="dense"
                                    name="expiry"
                                    label="Medicine expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Medicines;