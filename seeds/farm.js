const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});


const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);


Product.insertMany([
    { name: 'Melon', price: 3.99, season: 'Summer' },
    { name: 'Apple', price: 2.99, season: 'Fall' },
    { name: 'Cucumber', price: 7.99, season: 'Winter' }
])


const makeFarm = async () => {
    const farm = new Farm({ name: 'xxx farm', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Melon' });
    console.log(melon);
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}
makeFarm();


const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'xxx farm' });
    const cucumber = await Product.findOne({ name: 'Cucumber' });
    console.log(cucumber);
    farm.products.push(cucumber);
    await farm.save();
    console.log(farm);
}
addProduct();

Farm.findOne({ name: 'xxx farm' })
    .populate('products')
    .then(farm => console.log(farm))



