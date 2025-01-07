const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors')
const fs = require('fs');

const port = 5000;

app.use(express.json());

app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  try {
    res.json({
      message: 'File uploaded successfully!',
      filePath: `uploads/${req.file.filename}`,
      fileName: req.file.filename,
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/files', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to scan files!' });
    }
    res.json(files);
  });
});

app.get('/images', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error reading files' });
    } else {
      res.json(files);
    }
  });
});

const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Profind',
  password: 'Gwapojosef1', 
  port: 5432,
});

pool.connect().then(() => console.log('Connected to the database')).catch(err => console.error('Database connection error', err));

app.post('/register', async (req, res) => {
  const formData = req.body;

  const query = `
    INSERT INTO users (
        first_name, last_name, middle_name, sex, date_of_birth, place_of_birth_city, 
        place_of_birth_province, place_of_birth_country, nationality, religion, gender, 
        marital_status, partner_first_name, partner_last_name, partner_middle_name, 
        partner_contact_number, address_house_no, address_street, address_barangay, 
        address_city, address_province, address_country, phone_number, email, occupation, 
        company, years_of_employment, blood_type, emergency_contact, mparent_fname, 
        mparent_lname, mparent_midname, mparent_citizenship, mparent_age, mparent_occupation, 
        mparent_residence, mparent_religion, fparent_fname, fparent_lname, fparent_midname, 
        fparent_citizenship, fparent_age, fparent_occupation, fparent_residence, 
        fparent_religion, guard_fname, guard_lname, guard_midname, guard_contact, 
        guard_citizenship, guard_age, guard_occupation, guard_residence, guard_religion, image, 
        emergency_contactnum, emergency_contactrelation
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
        $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, 
        $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, 
        $55, $56, $57
    ) RETURNING id;
`;

const values = [
  formData.firstName, formData.lastName, formData.middleName, formData.sex, formData.dateOfBirth,
  formData.placeOfBirthCity, formData.placeOfBirthProvince, formData.placeOfBirthCountry, 
  formData.nationality, formData.religion, formData.gender, formData.maritalStatus, 
  formData.partnerFirstName, formData.partnerLastName, formData.partnerMiddleName, 
  formData.partnerContactNumber, formData.addressHouseNo, formData.addressStreet, 
  formData.addressBarangay, formData.addressCity, formData.addressProvince, 
  formData.addressCountry, formData.phoneNumber, formData.email, formData.occupation, 
  formData.company, formData.yearsOfEmployment, formData.bloodType, formData.emergencyContact, 
  formData.MparentFName, formData.MparentLName, formData.MparentMidName, 
  formData.MparentCitizenship, formData.MparentAge, formData.MparentOccupation, 
  formData.MparentResidence, formData.MparentReligion, formData.FparentFName, 
  formData.FparentLName, formData.FparentMidName, formData.FparentCitizenship, 
  formData.FparentAge, formData.FparentOccupation, formData.FparentResidence, 
  formData.FparentReligion, formData.GuardFName, formData.GuardLName, formData.GuardMidName, 
  formData.GuardContact, formData.GuardCitizenship, formData.GuardAge, 
  formData.GuardOccupation, formData.GuardResidence, formData.GuardReligion, 
  formData.image, formData.emergencyContactRelation, formData.emergencyContactNumber
];

  try {
    const result = await pool.query(query, values);
    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ success: false, message: 'Failed to save data to database' });
  }
});

app.get('/get-user-data', async (req, res) => {
  const { imageName } = req.query;
  try {
    const query = 'SELECT * FROM users WHERE image = $1';
    const result = await pool.query(query, [imageName]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('No data found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

console.log('Server started at http://localhost:5000');
app.listen(port);
