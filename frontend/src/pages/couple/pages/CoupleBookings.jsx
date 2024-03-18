import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import ServiceCard from '../components/ServiceCard';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificServices } from '../../../redux/userHandle';

const CoupleBookings = () => {

    const dispatch = useDispatch()

    const { currentUser, loading, specificServiceData, responseSpecificServices } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSpecificServices(currentUser._id, "getBookingedServicesByCouple"));
    }, [dispatch, currentUser]);

    const sortOptions = [
        { value: 'oldest', label: 'Oldest' },
        { value: 'newest', label: 'Newest' }
    ];

    const [open, setOpen] = useState(null);
    const [selectedOption, setSelectedOption] = useState('newest');

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleMenuItemClick = (value) => {
        setSelectedOption(value);
        handleClose();
    };

    return (
        <>
            {loading ?
                <h1>
                    Loading...
                </h1>
                :
                <>
                    {responseSpecificServices ?
                        <h1>
                            No Bookings Till Now
                        </h1>
                        :
                        <Container>
                            <Typography sx={{ fontSize: 40, textAlign: "center" }}>
                                My Bookings
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                flexWrap="wrap-reverse"
                                justifyContent="flex-end"
                                sx={{ mb: 5 }}
                            >
                                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                                    <Button
                                        disableRipple
                                        color="inherit"
                                        onClick={handleOpen}
                                        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    >
                                        Sort By:&nbsp;
                                        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                            {sortOptions.find(option => option.value === selectedOption)?.label}
                                        </Typography>
                                    </Button>

                                    <Menu
                                        open={!!open}
                                        anchorEl={open}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    [`& .${listClasses.root}`]: {
                                                        p: 0,
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {sortOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                selected={option.value === selectedOption}
                                                onClick={() => handleMenuItemClick(option.value)}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Stack>
                            </Stack>

                            <Grid container spacing={3}>
                                {specificServiceData && specificServiceData.map((service, index) => (
                                    <Grid key={index} xs={12} sm={6} md={3}>
                                        <ServiceCard service={service} />
                                    </Grid>
                                ))}
                            </Grid>

                        </Container>
                    }
                </>
            }
        </>
    );
}

export default CoupleBookings