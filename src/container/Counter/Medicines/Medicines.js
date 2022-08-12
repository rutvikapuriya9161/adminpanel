import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Medicines(props) {
    const [dopen, setDopen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [update, setUpdate] = useState(false);

    const handleDClickOpen = () => {
        setDopen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDopen(false);
        setUpdate(false);
    };

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true)

        formik.setValues(params.row);
    }

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }


        if (localData === null) {
            localStorage.setItem("Medicines", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("Medicines", JSON.stringify(localData));
        }

        console.log(data, localData);

        loadData();
        handleClose();
        formik.resetForm();

    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        price: yup.number().required("please enter price"),
        quantity: yup.string().required("please enter quantity"),
        expiry: yup.string().required("please enter expiry")
    });

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

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'price', headerName: 'Price', width: 170 },
        { field: 'quantity', headerName: 'Quantity', width: 170 },
        { field: 'expiry', headerName: 'Expiry', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleDelete = (params) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Medicines", JSON.stringify(fData));

        // console.log(params.id, localData);
        handleClose();
        loadData();
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(
        () => {
            loadData();
        },
        [])

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let fData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.price.toString().includes(val) ||
            d.quantity.toString().includes(val) ||
            d.expiry.toString().includes(val)
        ));

        setFilterData(fData)
    }

    const fData = filterData.length > 0 ? filterData : data;

    return (
        <div>
            <h1>Medicines</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicine
                </Button>
                <TextField
                    margin="dense"
                    name="search"
                    label="Medicine search"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={fData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure Delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicine</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
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
                                    value={values.price}
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
                                    value={values.quantity}
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
                                    value={values.expiry}
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
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                        <Button type='submit'>update</Button>
                                        :
                                        <Button type='submit'>Add</Button>
                                    }
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div>
    );
}

export default Medicines;