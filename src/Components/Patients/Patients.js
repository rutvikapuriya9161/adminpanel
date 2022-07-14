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

function Patients(props) {
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
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }


        if (localData === null) {
            localStorage.setItem("Patients", JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem("Patients", JSON.stringify(localData));
        }

        console.log(data, localData);

        loadData();
        handleClose();
        formik.resetForm();

    }

    let schema = yup.object().shape({
        name: yup.string().required("please enter name"),
        email: yup.string().email("please enter valid email").required("please enter email"),
        contact: yup.number().required("please enter contact number")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values);
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'email', headerName: 'email', width: 170 },
        { field: 'contact', headerName: 'contact', width: 170 },
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
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("Patients", JSON.stringify(fData));

        // console.log(params.id, localData);
        handleClose();
        loadData();
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

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
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let fData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.email.toString().includes(val) ||
            d.contact.toString().includes(val)
        ));

        setFilterData(fData)
    }

    const fData = filterData.length > 0 ? filterData : data;

    return (
        <div>
            <h1>Patients</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Patients
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
                                    label="Patient Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    value={values.email}
                                    margin="dense"
                                    name="email"
                                    label="Patient email"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email ? <p>{errors.email}</p> : ''}
                                <TextField
                                    value={values.contact}
                                    margin="dense"
                                    name="contact"
                                    label="Patient contact"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.contact && touched.contact ? <p>{errors.contact}</p> : ''}
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

export default Patients;