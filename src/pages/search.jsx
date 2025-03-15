import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authcon';
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Pagination,
  Chip,
  Container,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../comp/header/navbar';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useLocation } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
const navigate=useNavigate();
  const storedLookUp = localStorage.getItem("lookUp");
const location=useLocation();
const {query}=location.state;
const [squery, setSQuery] = useState(query);
const [filteredResults,setFilteredResults]=useState([])
  const { isAuthenticated } = useAuth();
console.log("isauth",isAuthenticated)

    useEffect(()=>{

        const allResults = JSON.parse(storedLookUp)
console.log("allresults",allResults)
for(const key in allResults){
    if(key.toLowerCase().includes(squery.toLowerCase())){
        setFilteredResults(allResults[key]);
        break;
        }
        }
    },[query])
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  // Calculate pagination
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = filteredResults.slice(startIndex, startIndex + itemsPerPage);

  // Handle page changes
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} L`;
    } else {
      return `₹${numPrice.toLocaleString()}`;
    }
  };


  

  return (
    <>
    {(isAuthenticated)?<Lbar/> : <Navbar/> }
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ArrowBackIcon  sx={{
      cursor:"pointer",
      marginBottom:'2rem'
    }} onClick={()=>{navigate(-1)}} />
      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {Math.min(filteredResults.length, startIndex + 1)}-
        {Math.min(filteredResults.length, startIndex + itemsPerPage)} of {filteredResults.length} results
      </Typography>

      {/* Results Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {currentResults.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <Card sx={{ 
      maxWidth: 345, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-4px)',
        transition: 'all 0.3s ease-in-out'
      }
    }}>
    
      <CardContent>
      <CardMedia
        component="img"
        height="200"
        image="./images/noimage.jpg"
        alt="Property"
        sx={{
          marginBottom:'1rem'
        }}
      />
        <Typography gutterBottom variant="h5" component="div">
          {formatPrice(property.price)}
          <Chip
            label={property.Status}
            color={property.Status === "Under Construction" ? "warning" : "success"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Chip 
            icon={<ApartmentIcon />} 
            label={property.type_of_building} 
            variant="outlined" 
            size="small"
          />
          <Chip 
            label={property.neworold} 
            variant="outlined" 
            size="small"
          />
        </Stack>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BedIcon color="action" />
              <Typography variant="body2">{property.Bedrooms} Beds</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BathtubIcon color="action" />
              <Typography variant="body2">{property.Bathrooms} Baths</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SquareFootIcon color="action" />
              <Typography variant="body2">{property.area} sq.ft</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ElevatorIcon color="action" />
              <Typography variant="body2">{property.Lift} Lifts</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ₹{property.Price_sqft}/sq.ft
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocationOnIcon color="action" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {property.latitude}, {property.longitude}
          </Typography>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {property.desc}
        </Typography>
      </CardContent>
    </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Container></>
  );
};

export default SearchResults;