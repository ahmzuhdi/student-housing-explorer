/* =====================================================
   Student Housing Explorer
   Data Source
   Version 1.0
===================================================== */

const accommodations = [

{
    id:1,

    name:"Kost Melati",

    type:"PBSA",

    gender:"Female",

    price:650000,

    distance:320,

    occupancy:95,

    availableRooms:5,

    rating:4.8,

    phone:"081234567890",

    address:"Balun Ijuk",

    latitude:-2.1245,

    longitude:106.1136,

    facilities:{
        wifi:true,
        ac:true,
        laundry:true,
        parking:true,
        kitchen:true
    },

    image:"https://picsum.photos/400/250?random=1"

},

{

    id:2,

    name:"Kost Mawar",

    type:"HMO",

    gender:"Male",

    price:550000,

    distance:510,

    occupancy:82,

    availableRooms:2,

    rating:4.5,

    phone:"081222222222",

    address:"Balun Ijuk",

    latitude:-2.1232,

    longitude:106.1155,

    facilities:{
        wifi:true,
        ac:false,
        laundry:true,
        parking:true,
        kitchen:false
    },

    image:"https://picsum.photos/400/250?random=2"

},

{

    id:3,

    name:"Kost Dahlia",

    type:"Semi PBSA",

    gender:"Mixed",

    price:700000,

    distance:410,

    occupancy:91,

    availableRooms:4,

    rating:4.9,

    phone:"081233333333",

    address:"Balun Ijuk",

    latitude:-2.1254,

    longitude:106.1115,

    facilities:{
        wifi:true,
        ac:true,
        laundry:true,
        parking:false,
        kitchen:true
    },

    image:"https://picsum.photos/400/250?random=3"

},

{

    id:4,

    name:"Kost Anggrek",

    type:"PBSA",

    gender:"Female",

    price:800000,

    distance:280,

    occupancy:100,

    availableRooms:0,

    rating:5.0,

    phone:"081244444444",

    address:"Balun Ijuk",

    latitude:-2.1264,

    longitude:106.1148,

    facilities:{
        wifi:true,
        ac:true,
        laundry:true,
        parking:true,
        kitchen:true
    },

    image:"https://picsum.photos/400/250?random=4"

},

{

    id:5,

    name:"Kost Sakura",

    type:"HMO",

    gender:"Mixed",

    price:600000,

    distance:640,

    occupancy:74,

    availableRooms:8,

    rating:4.3,

    phone:"081255555555",

    address:"Balun Ijuk",

    latitude:-2.1217,

    longitude:106.1124,

    facilities:{
        wifi:false,
        ac:false,
        laundry:true,
        parking:true,
        kitchen:true
    },

    image:"https://picsum.photos/400/250?random=5"

}

];


/* ===========================================
   Summary Statistics
=========================================== */

const statistics = {

    totalAccommodation:82,

    averageRent:702317,

    averageDistance:430,

    averageOccupancy:95,

    averageRating:4.7

};


/* ===========================================
   Campus Location
=========================================== */

const campus = {

    name:"Universitas Bangka Belitung",

    latitude:-2.1239,

    longitude:106.1142

};
