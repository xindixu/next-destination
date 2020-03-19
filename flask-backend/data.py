
# TODO: replace with actual data from db
cities_data = [
    {'name': 'Austin', 'state': 'TX',
        'description': 'Austin is known for its eclectic live-music scene centered around country, blues and rock. Austin is the state capital of Texas, an inland city bordering the Hill Country region. Its many parks and lakes are popular for hiking, biking, swimming and boating.',
        'airbnb': '80',
        'artist': 'Khalid',
        'id': 'austin',
        'image': 'https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1548256026/photos/288314_original.jpg',
        'population': '964,254'},
    {'name': 'Dallas', 'state': 'TX',
        'description': 'Dallas, a modern metropolis in north Texas, is a commercial and cultural hub of the region.  Downtown’s Sixth Floor Museum at Dealey Plaza commemorates the site of President John F. Kennedy’s assassination in 1963. In the Arts District, the Dallas Museum of Art and the Crow Collection of Asian Art cover thousands of years of art.',
        'airbnb': '90',
        'artist': 'Ed Sheeran',
        'id': 'dallas',
        'image': 'https://visitdallas.imgix.net/Open_Graph/shutterstock_234181351.jpeg?w=800&h=600&fit=crop&crop=entropy,faces&q=60&fm=pjpg&auto=compress,enhance,format,redeye&trim=auto',
        'population': '1,345,047'},
    {'name': 'Nashville', 'state': 'TN',
        'description': 'Legendary country music venues include the Grand Ole Opry House, home of the famous “Grand Ole Opry” stage and radio show. The Country Music Hall of Fame and Museum and historic Ryman Auditorium are Downtown, as is the District, featuring honky-tonks with live music and the Johnny Cash Museum, celebrating the singers life.',
        'airbnb': '70',
        'id': 'nashville',
        'image': 'https://www.visitmusiccity.com/sites/www/files/styles/medium_portrait_3x4/public/2019-04/Skyline_FromJeffersonStBridge_1600.jpg?h=ada05aa9&itok=38Ob7xPZ',
        'population_size': '692,587'},
    {'name': 'Houston', 'state': 'TX',
        'description': 'Houston is the most populous city in the U.S. state of Texas. Houston has become a global city, with strengths in culture, medicine, and research. The city has a population from various ethnic and religious backgrounds and a large and growing international community. Houston is the most diverse metropolitan area in Texas and has been described as the most racially and ethnically diverse major metropolis in the U.S.',
        'airbnb': '100',
        'artist': 'Billie Eilish',
        'id': 'houston',
        'image': 'https://www.conceiveabilities.com/assets/images/about/locations/Houston-downtown-nightlife.jpg',
        'population': '2,325,502'}
]

member_contribs = {
    "marshall": {"commits": 0, "issues": 0},
    "xindi": {"commits": 0, "issues": 0},
    "yulissa": {"commits": 0, "issues": 0},
    "nathan": {"commits": 0, "issues": 0},
    "quinton": {"commits": 0, "issues": 0}
}

about_data = [
    {'name': 'Yulissa Montes', "photo": 'a', 'stats': member_contribs["yulissa"], 'description': 'Senior mathematics major, loves hanging out with her doggo.',
     'responsibilities':"Routing, Navigation, Design", 'id':'yulissa'},
    {'name': 'Xindi Xu', 'photo': 'a', 'stats': member_contribs["xindi"], 'description': 'Senior Advertising student at UT. Working toward a career in Software Engineering! Cat lover and accessibility fan!',
     'responsibilities':"React Master", 'id':'xindi'},
    {'name': 'Marshall Munsch-Hayhurst', 'stats': member_contribs["marshall"], 'photo': 'a', 'description': 'Senior Economics, loves hiking in the hill country',
     'responsibilities':"API Integration, Backend", 'id':'marshall'},
    {'name': 'Nathan Craig', 'photo': 'a', 'stats': member_contribs["nathan"], 'description': 'Senior Mechanical Engineer, loves swimming',
     'responsibilities':"Frontend Design", 'id':'nathan'},
    {'name': 'Quinton Pham', 'photo': 'a', 'stats': member_contribs["quinton"], 'description': 'Junior Biochemistry; loves long walks on the beach',
     'responsibilities':"API Integration", 'id':'quinton'}
]
restaurants_data = [{
    'name': 'Barbeque Resstaurant',
    'category': 'Barbeque',
    'description': 'as;dfalsdf;',
    'address': '1234 Rockefeller Street',
    'city': 'Austin',
    'coordinates': {'x': '1234', 'y': '1234'},
    'price': '$$$',
    'hours': [{
        'day': 'M',
        'start': '8:00',
        'end': '9:00'}]
},
    {
    'name': 'Marshalls Restaurant',
    'category': 'Seafood',
    'description': 'as;dfalsdf;',
    'address': '1234 Rockefeller Street',
    'city': 'Austin',
    'coordinates': {'x': '1234', 'y': '1234'},
    'price': '$$$',
    'hours': [{
        'day': 'M',
        'start': '8:00',
        'end': '9:00'}
    ]
}]
events_data = [{
    'name': 'V day',
    'category': 'Holiday',
    'location':{'austin', 'austin'},
    'description': 'asdsf',
    'address': 'sdasf',
    'coordinates': {'x': 'asdfdsa', 'y': 'adfadsf'},
    'price': 'asdfas',
    'hours': [{
        'day': 'afsdf',
        'start': 'gfhfh',
        'end': 'nxcv,cxzbv'}]
}]