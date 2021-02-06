const express=require('express');
const path=require('path');
const port=4000;

const db= require('./config/mongoose');
const Contact=require('./models/contact')
;
const app=express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('Assets'));
app.use(express.urlencoded())

const contactList=[

	{
		name: 'Prakhar Agrawal',
		phone: 1234567890
	},
	{
		name: 'Krsna',
		phone: 1080000000
	},
	{
		name: 'Acyuta das',
		phone: 09876543217
	}
]

app.get('/', function(req,res){

	Contact.find({}, function(err, contacts){
		if(err){
			console.log('Error in fetching contacts from db');
			return;
		}

		return res.render('home',{
			Contact_List: contacts
		});

	});
});

app.post('/create-contact', function(req, res){
	// console.log(req.body);

	// contactList.push(req.body);

	Contact.create({

		name: req.body.name,
		phone: req.body.phone
	}, function(err, newContact){
		if(err){
			console.log('error in creating a contact');
			return;
		}
		console.log('**********', newContact);
		return res.redirect('back');

	});
});

app.get('/delete-contact', function(req,res){
	console.log(req.query);
	let id=req.query.id;

	// let contactIndex=contactList.findIndex(contact=> contact.phone==phone)
	// for(var i =0; i<contactList.length; i++){
	// 	if(contactList[i].phone==phone){
	// 		contactList.splice(i,1);
	// 	}
	// }

	Contact.findByIdAndDelete(id, function(err){
		if(err){
			console.log("Error in deleting contact");
			return;
		}

		return res.redirect('back');
	});
});

app.get('/edit-contact', function(req,res){


	let id=req.query.id;
	console.log(id);
	Contact.find({}, function(err, contacts){
		if(err){
			console.log('Error in editing contact');
			return;
		}
		return res.render('home', {
			Contact_List: contacts,
			contactId: id
		});

	});
});

app.post('/update-contact', function(req, res){

	// let contactId=req.query;
	// console.log(req.body);
	// console.log(contactId);

	// for(var i=0; i< contactList.length; i++){
	// 	if(contactList[i].phone==contactId.phone){
	// 		contactList.splice(i, 1, req.body);
	// 	}
	// }

	// return res.redirect('/');

	let contactId=req.query.id;
	console.log(contactId);
	console.log(req.body);

	Contact.findByIdAndUpdate(contactId,{name: req.body.name, phone: req.body.phone}, function(err, contacts){
		if(err){
			console.log('Error in updating contact');
			return;
		}
		return res.redirect('/');
	});

});

app.listen(port, function(err){

	if(err){
		console.log(err);
	}
	console.log('Server is running on port: ', port);
})