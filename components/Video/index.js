import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import $ from 'jquery';

import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';
import '@datatables.net/editor-dt';
import 'datatables.net-searchbuilder';
import 'datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.min.css';

//import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons-dt';
import '@datatables.net/editor-dt/css/editor.dataTables.min.css';
import Editor from 'datatables.net-editor';
import 'datatables.net-select-dt';


import { Container, Box, Typography, CircularProgress, Button, TextField, Snackbar, Alert } from '@mui/material';
import { getContactGroups } from '../../src/api/groupConnect/services/getContactGroups';
import { getContactsByGroup } from '../../src/api/groupConnect/services/getContactsByGroup'; // Assuming you have this function
import { getContactById } from '../../src/api/groupConnect/services/getContactById'; // Assuming you have this function
import { putContact } from '../../src/api/groupConnect/services/putContact'; // Assuming you have this function

import Papa from 'papaparse';



function Component() {
    const auth = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContacts, setShowContacts] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

// Add this observer workaround
useEffect(() => {
    const observer = new MutationObserver(() => {
        const resizeObserverErrDiv = document.querySelector('.resize-observer-error');
        if (resizeObserverErrDiv) {
            resizeObserverErrDiv.style.display = 'none';
        }
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
        observer.disconnect();
    };
}, []);

    const handleEditContactSubmit = async (event) => {
        console.log('call handleEditContactSubmit');

        event.preventDefault();

        const updatedContact = {};
        $(event.target).serializeArray().forEach(item => {
            updatedContact[item.name] = item.value;
        });

        try {
            await saveContact(updatedContact); // Use saveContact function

            // Show success Snackbar
            setSnackbarMessage('Contact updated successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Refresh contacts list
            const response = await getContactsByGroup(selectedContact.GroupID);
            setContacts(response);

        } catch (error) {
            // Show error Snackbar
            setSnackbarMessage(`Error updating contact: ${error.message}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        console.log("Video Auth call useEffect - Component.js")
        if (auth) {
            fetchData();
        }
    }, [auth]);


    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            console.log("Inside useEffect - GroupTable");

            // If DataTable instance already exists, destroy it before reinitializing
            if ($.fn.DataTable.isDataTable('#dataTable')) {
                console.log("We DESTROY #dataTable");
                $('#dataTable').DataTable().clear().destroy();
                // Clear the table contents
                $('#dataTable').empty(); // This clears the whole table including thead and tbody
            }
            // If DataTable instance already exists, destroy it before reinitializing
            if ($.fn.DataTable.isDataTable('#contactsTable')) {
                console.log("We DESTROY #contactsTable");
                $('#contactsTable').DataTable().clear().destroy();
                // Clear the table contents
                $('#contactsTable').empty(); // This clears the whole table including thead and tbody
            }


            $('#dataTable').DataTable({
                destroy: true,
                data: data.map(group => ({
                    ...group,
                    action: `<button class="view-contacts" data-groupid="${group.Id}">View Contacts</button>`
                })),
                columns: [
                    { data: 'Id', title: 'GroupID' },
                    { data: 'GroupName', title: 'GroupName' },
                    { data: 'CreationDate', title: 'CreationDate' },
                    { data: 'OwnerID', title: 'OwnerID' },
                    { data: 'action', title: 'Action' }
                ]
            });

            // Remove any previous event handlers to avoid duplicates
            $('#dataTable').off('click', '.view-contacts');
            $('#dataTable').on('click', '.view-contacts', function () {
                const groupId = $(this).data('groupid');
                handleViewContacts(groupId);
            });
        }
    }, [data]);

    useEffect(() => {
        let contactsTable;
        if (Array.isArray(contacts) && contacts.length > 0) {
            console.log('Contacts data:', contacts);

            // If DataTable instance already exists, destroy it before reinitializing
            if ($.fn.DataTable.isDataTable('#contactsTable')) {
                console.log("We DESTROY #contactsTable");
                $('#contactsTable').DataTable().clear().destroy();
                // Clear the table contents
                $('#contactsTable').empty(); // This clears the whole table including thead and tbody
            }
            var fields = Object.keys(data[0]).map(function (key) {
                return { name: key, label: key };
            });

            var editor = new $.fn.dataTable.Editor({
                ajax: {
                    url: `${process.env.REACT_APP_API_BASE_AUTH_DSA}/editdata/`,
                    type: "POST",
                    contentType: "application/json",
                    data: function (d) {
                        return JSON.stringify(d);
                    }
                },
                table: "#contactsTable",
                idSrc: "Id",
                fields: [
                    { label: "First Name", name: "FirstName" },
                    { label: "Last Name", name: "LastName" },
                    { label: "Email", name: "Email" },
                    { label: "Phone Number", name: "PhoneNumber" },
                    { label: "Company ID", name: "CompanyID" },

                    { label: 'ProspectPosition', name: 'ProspectPosition' },
                    { label: 'CompanyName', name: 'CompanyName' },
                    { label: 'CompanyWebsite', name: 'CompanyWebsite' },
                    { label: 'CompanyDomain', name: 'CompanyDomain' },
                    { label: 'ProspectLocation', name: 'ProspectLocation' },
                    { label: 'ProspectLinkedinURL', name: 'ProspectLinkedinURL' },
                    { label: 'CompanyIndustry', name: 'CompanyIndustry' },
                    { label: 'CompanySpecialities', name: 'CompanySpecialities' },
                    { label: 'CompanyEmployeeCount', name: 'CompanyEmployeeCount' },
                    { label: 'CompanyEmployeeRange', name: 'CompanyEmployeeRange' },
                    { label: 'CompanyLocation', name: 'CompanyLocation' },
                    { label: 'ProspectConnections', name: 'ProspectConnections' },
                    { label: 'YearsInPosition', name: 'YearsInPosition' },
                    { label: 'MonthsInPosition', name: 'MonthsInPosition' },
                    { label: 'YearsInCompany', name: 'YearsInCompany' },
                    { label: 'MonthsInCompany', name: 'MonthsInCompany' },
                    { label: 'CompanyLinkedinIDURL', name: 'CompanyLinkedinIDURL' },
                    { label: 'CompanyType', name: 'CompanyType' },
                    { label: 'CompanyYearFounded', name: 'CompanyYearFounded' },
                    { label: 'CompanyDescription', name: 'CompanyDescription' },
                    { label: 'CompanyProfilePicture', name: 'CompanyProfilePicture' },
                    { label: 'ProspectPositionDescription', name: 'ProspectPositionDescription' },
                    { label: 'ProspectLinkedinIDURL', name: 'ProspectLinkedinIDURL' },
                    { label: 'ProspectSalesNavigatorURL', name: 'ProspectSalesNavigatorURL' },
                    { label: 'ProspectSummary', name: 'ProspectSummary' },
                    { label: 'ProspectHeadline', name: 'ProspectHeadline' },
                    { label: 'ProspectIsPremium', name: 'ProspectIsPremium' },
                    { label: 'ProspectIsOpenProfile', name: 'ProspectIsOpenProfile' },
                    { label: 'ProspectIsOpenToWork', name: 'ProspectIsOpenToWork' },
                    { label: 'ProspectCurrentPositions', name: 'ProspectCurrentPositions' },
                    { label: 'ProspectProfilePicture', name: 'ProspectProfilePicture' },
                    { label: 'ProspectFullName', name: 'ProspectFullName' },
                    { label: 'ProspectIndustry', name: 'ProspectIndustry' },
                ]
            });

            let groupColumn = 1;
            contactsTable = $('#contactsTable').DataTable({
                //destroy: true,
                dom: "Blfrpitpi",
                data: contacts.map(contact => ({
                    ...contact,
                    action: `<button class="edit-contact btn btn-primary" data-contactid="${contact.Id}">Edit</button>`
                })),
                columns: [
                    { data: 'Id', title: 'ContactID' },

                    { data: 'FirstName', title: 'FirstName' },
                    { data: 'LastName', title: 'LastName' },
                    { data: 'ProspectPosition', title: 'ProspectPosition' },
                    { data: 'CompanyName', title: 'CompanyName' },
                    { data: 'CompanyWebsite', title: 'CompanyWebsite' },
                    { data: 'CompanyDomain', title: 'CompanyDomain' },
                    { data: 'ProspectLocation', title: 'ProspectLocation' },
                    { data: 'ProspectLinkedinURL', title: 'ProspectLinkedinURL' },
                    { data: 'CompanyIndustry', title: 'CompanyIndustry' },
                    { data: 'CompanySpecialities', title: 'CompanySpecialities' },
                    { data: 'CompanyEmployeeCount', title: 'CompanyEmployeeCount' },
                    { data: 'CompanyEmployeeRange', title: 'CompanyEmployeeRange' },
                    { data: 'CompanyLocation', title: 'CompanyLocation' },
                    { data: 'ProspectConnections', title: 'ProspectConnections' },
                    { data: 'YearsInPosition', title: 'YearsInPosition' },
                    { data: 'MonthsInPosition', title: 'MonthsInPosition' },
                    { data: 'YearsInCompany', title: 'YearsInCompany' },
                    { data: 'MonthsInCompany', title: 'MonthsInCompany' },
                    { data: 'CompanyLinkedinIDURL', title: 'CompanyLinkedinIDURL' },
                    { data: 'CompanyType', title: 'CompanyType' },
                    { data: 'CompanyYearFounded', title: 'CompanyYearFounded' },
                    { data: 'CompanyDescription', title: 'CompanyDescription' },
                    { data: 'CompanyProfilePicture', title: 'CompanyProfilePicture' },
                    { data: 'ProspectPositionDescription', title: 'ProspectPositionDescription' },
                    { data: 'ProspectLinkedinIDURL', title: 'ProspectLinkedinIDURL' },
                    { data: 'ProspectSalesNavigatorURL', title: 'ProspectSalesNavigatorURL' },
                    { data: 'ProspectSummary', title: 'ProspectSummary' },
                    { data: 'ProspectHeadline', title: 'ProspectHeadline' },
                    { data: 'ProspectIsPremium', title: 'ProspectIsPremium' },
                    { data: 'ProspectIsOpenProfile', title: 'ProspectIsOpenProfile' },
                    { data: 'ProspectIsOpenToWork', title: 'ProspectIsOpenToWork' },
                    { data: 'ProspectCurrentPositions', title: 'ProspectCurrentPositions' },
                    { data: 'ProspectProfilePicture', title: 'ProspectProfilePicture' },
                    { data: 'ProspectFullName', title: 'ProspectFullName' },
                    { data: 'ProspectIndustry', title: 'ProspectIndustry' },

                    { data: 'Email', title: 'Email' },
                    { data: 'PhoneNumber', title: 'PhoneNumber' },
                    { data: 'CompanyID', title: 'CompanyID' },
                    { data: 'action', title: 'Action' }

                ],

                order: [[groupColumn, 'asc']],
                select: {
                    blurable: true,
                    selector: 'td:first-child',
                    style: 'os'
                },

                pageLength: 10, // Set the number of items per page
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]], // Allows the user to change the page length
                buttons: [
                    { extend: 'create', editor: editor },
                    { extend: 'edit', editor: editor },
                    { extend: 'remove', editor: editor },
                    { extend: 'spacer' },
                    {
                        extend: 'spacer',
                        style: 'bar',
                        text: 'Filter:'
                    },
                    {
                        extend: 'searchBuilder'
                    },
                    { extend: 'spacer' },
                    {
                        extend: 'spacer',
                        style: 'bar',
                        text: 'Export data:'
                    },
                    {
                        extend: 'collection',
                        text: 'Export',
                        buttons: ['copy', 'excel',
                            {
                                extend: 'csv',
                                text: 'Export CSV',
                                className: 'btn-space',
                                exportOptions: {
                                    orthogonal: null
                                }
                            },
                            'pdf', 'print']
                    },
                    { extend: 'spacer' },
                    {
                        text: 'Import CSV',
                        action: function () {
                            uploadEditor.create({
                                title: 'CSV file import'
                            });
                        }
                    }
                ],
            });
            console.log("Table generated");

            //table.buttons().container().appendTo($('#myButtons'));

            $('#contactsTable').on('click', 'tbody td:not(:first-child)', function (e) {
                editor.inline(this, {
                    onBlur: 'submit',
                    submit: 'allIfChanged'
                });
            });



            editor.on('submitSuccess', function (e, json, data, action) {
                console.log("Data submitted successfully. Reloading data.");
                //reloadData(); // Use this function to reload data
            });

            // Remove any previous event handlers to avoid duplicates
            $('#contactsTable').off('click', '.edit-contact');
            $('#contactsTable').on('click', '.edit-contact', async function () {
                const contactId = $(this).data('contactid');
                try {
                    const contact = await handleEditContactClick(contactId);
                    //setSelectedContact(contact);
                } catch (error) {
                    setError(`Error retrieving contact: ${error.message}`);
                }
            });

            console.log("Click listeners added");
        }

        // Upload Editor - triggered from the import button. Used only for uploading a file to the browser

        const uploadEditor = new $.fn.dataTable.Editor({
            fields: [
                {
                    label: 'CSV file:',
                    name: 'csv',
                    type: 'upload',
                    ajax: function (files, done) {
                        // Ajax override of the upload so we can handle the file locally. Here we use Papa
                        // to parse the CSV.
                        Papa.parse(files[0], {
                            header: true,
                            skipEmptyLines: true,
                            complete: function (results) {
                                if (results.errors.length) {
                                    console.log(results);
                                    uploadEditor
                                        .field('csv')
                                        .error('CSV parsing error: ' + results.errors[0].message);
                                }
                                else {
                                    selectColumns(editor, results.data, results.meta.fields);
                                }

                                // Tell Editor the upload is complete - the array is a list of file
                                // id's, which the value of doesn't matter in this case.
                                done([0]);
                            }
                        });
                    }
                }
            ]
        });

        // Display an Editor form that allows the user to pick the CSV data to apply to each column
        function selectColumns(editor, csv, header) {
            let selectEditor = new $.fn.dataTable.Editor();
            let fields = editor.order();

            header.unshift("(Empty string)"); // Add an option for the empty string at the start

            for (let i = 0; i < fields.length; i++) {
                let field = editor.field(fields[i]);

                // Add options for CSV headers and an additional option for empty string
                selectEditor.add({
                    label: field.label(),
                    name: field.name(),
                    type: 'select',
                    options: header.map(function (headerName) {
                        return headerName === "(Empty string)"
                            ? { label: "(Empty string)", value: "" }
                            : { label: headerName, value: headerName };
                    }),
                    // Set the default value for the dropdown to map the CSV column to the field
                    // or to "(Empty string)" to insert an empty string into the column
                    def: header[i] === "(Empty string)" ? "" : header[i]
                });
            }

            selectEditor.create({
                title: 'Map CSV fields',
                buttons: 'Import ' + csv.length + ' records',
                message:
                    'Select the CSV column you want to use the data from for each field. ' +
                    'Select "(Empty string)" to insert an empty string for the column.',
                onComplete: 'none'
            });

            selectEditor.on('submitComplete', function (e, json, data, action) {
                // Use the host Editor instance to show a multi-row create form allowing the user to submit the data.
                editor.create(csv.length, {
                    title: 'Confirm import',
                    buttons: 'Submit',
                    message:
                        'Click the <i>Submit</i> button to confirm the import of ' +
                        csv.length +
                        ' rows of data. Optionally, override the value for a field to set a common value by clicking on the field below.'
                });

                for (var i = 0; i < fields.length; i++) {
                    let field = editor.field(fields[i]);
                    let mapped = $.fn.dataTable.util.get(field.name())(data);

                    for (let j = 0; j < csv.length; j++) {
                        field.multiSet(j, csv[j][mapped]);
                    }
                }
            });
        }

    }, [contacts, showContacts]);



    const handleEditContactClick = async (contactId) => {
        console.log('call handleEditContactClick');
        try {
            const response = await getContactById(contactId);
            console.log('call setSelectedContact', response);
            setSelectedContact(response);
            console.log('AFTER SET handleEditContactClick');
        } catch (error) {
            setError(`Error retrieving contact: ${error.message}`);
        }
    };

    const fetchData = async () => {
        console.log('call fetchData');
        try {
            setLoading(true);
            const response = await getContactGroups();
            if (response.status === 404) {
                setError('No data found');
                setData([]);
            } else {
                setData(response);
            }
        } catch (error) {
            setError(`Error fetching data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleViewContacts = async (groupId) => {
        console.log('call handleViewContacts');
        try {
            setLoading(true);
            const response = await getContactsByGroup(groupId);
            setContacts(response);
            setShowContacts(true);
        } catch (error) {
            setError(`Error fetching contacts: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Make a simelar svae function asume we have a put function
    const saveContact = async (contact) => {
        console.log('call saveContact');
        console.log('contact', contact);
        try {
            const response = await putContact(contact.ContactID, contact);
            return response;
        } catch (error) {
            setError(`Error saving contact: ${error.message}`);
        }
    };


    const handleBack = () => {
        console.log('call handleBack');
        setShowContacts(false);

        fetchData();
    };

    const handleAddData = () => {
        // Implement the logic to add or upload data
        console.log('Add or upload data');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="xl">
                <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Error
                    </Typography>
                    <Typography>{error}</Typography>
                    {error === 'No data found' && (
                        <Button variant="contained" color="primary" onClick={handleAddData}>
                            Add/Upload Data
                        </Button>
                    )}
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                {!showContacts ? (
                    <>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Contact Groups
                        </Typography>
                        {data.length === 0 ? (
                            <Box>
                                <Typography>No data available</Typography>
                                <Button variant="contained" color="primary" onClick={handleAddData}>
                                    Add/Upload Data
                                </Button>
                            </Box>
                        ) : (
                            <table id="dataTable" className="display"></table>
                        )}
                    </>
                ) : (
                    <>
                        <Button variant="contained" color="secondary" onClick={handleBack}>
                            Back to Groups
                        </Button>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Contacts in Group
                        </Typography>
                        <table id="contactsTable" className="display"></table>
                        {selectedContact && (
                            <form id="editContactForm" onSubmit={handleEditContactSubmit} className="mt-3">
                                <input type="hidden" name="ContactID" value={selectedContact.Id} />
                                <Typography variant="h6" component="h2" gutterBottom>
                                    Edit Contact
                                </Typography>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="FirstName"
                                        value={selectedContact.FirstName}
                                        onChange={(e) => setSelectedContact({ ...selectedContact, FirstName: e.target.value })}
                                        required
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="LastName"
                                        value={selectedContact.LastName}
                                        onChange={(e) => setSelectedContact({ ...selectedContact, LastName: e.target.value })}
                                        required
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="Email"
                                        type="email"
                                        value={selectedContact.Email}
                                        onChange={(e) => setSelectedContact({ ...selectedContact, Email: e.target.value })}
                                        required
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="PhoneNumber"
                                        value={selectedContact.PhoneNumber}
                                        onChange={(e) => setSelectedContact({ ...selectedContact, PhoneNumber: e.target.value })}
                                        required
                                    />
                                </Box>
                                <Box mb={3}>
                                    <TextField
                                        fullWidth
                                        label="Company ID"
                                        name="CompanyID"
                                        value={selectedContact.CompanyID}
                                        onChange={(e) => setSelectedContact({ ...selectedContact, CompanyID: e.target.value })}
                                        required
                                    />
                                </Box>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                            </form>
                        )}
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={() => setSnackbarOpen(false)}
                        >
                            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default Component;