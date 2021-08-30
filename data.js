let movies = [
  {
    id: 1,
    title: 'Harry Potter and the Philosopher\'s Stone',
    description:'The film stars Daniel Radcliffe as Harry Potter, with Rupert Grint as Ron Weasley, and Emma Watson as Hermione Granger. Its story follows Harry\'s first year at Hogwarts School of Witchcraft and Wizardry as he discovers that he is a famous wizard and begins his formal wizarding education.',
    director: {
      name:'Chris Columbus',
      bio:'Chris Joseph Columbus is an American film director, producer, and screenwriter. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.',
      birthYear: '1958',
      deathYear:'', 
    },
    year: '2001',
    genre:'fantasy',
    imageURL: 'https://static.wikia.nocookie.net/harrypotter/images/f/fb/PS_poster.jpg/revision/latest?cb=20180318153750',
    featured: true
  },
  {
    id: 2,
    title: 'Titanic',
    description:'Titanic is a 1997 American epic romantic disaster movie. It was directed, written, and co-produced by James Cameron. The movie is about the 1912 sinking of the RMS Titanic. ... They fall in love after meeting aboard the ship, but it was not good for a rich girl to fall in love with a poor boy in 1912.',
    director: {
      name:'James Cameron',
      bio:'James Francis Cameron CC is a Canadian film director, producer, screenwriter, editor, artist, and environmentalist who currently lives in New Zealand. He is best known for making science fiction and epic films. Cameron first gained recognition for directing The Terminator',
      birthYear: '1954',
      deathYear:'', 
    },
    year: '1997', 
    genre:'romance',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png',
    featured: true
  },
  { 
    id: 3,
    title: 'La La Land',
    description:'La La Land is a 2016 American musical romantic comedy-drama film written and directed by Damien Chazelle. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress, who meet and fall in love while pursuing their dreams in Los Angeles.',
    director: {
      name:'Damien Chazelle',
      bio:'Damien Sayre Chazelle is an American film director, producer, and screenwriter. He is best known for his films Whiplash, La La Land, and First Man',
      birthYear: '1985',
      deathYear:'', 
    },
    year: '2016', 
    genre:'musical',
    imageURL: 'https://media.pathe.nl/nocropthumb/620x955/gfx_content/posters/lalalandposter2.jpg',
    featured: true
  },
  {
    id: 4,
    title: 'Erin Brockovich',
    description:'The film is a dramatization of the true story of Erin Brockovich, portrayed by Julia Roberts, who fought against the energy corporation Pacific Gas and Electric Company (PG&E) regarding its culpability for the Hinkley groundwater contamination incident.',
    director: {
      name:'Steven Soderbergh',
      bio:'Steven Andrew Soderbergh is an American film director, producer, screenwriter, cinematographer, and editor. An early pioneer of modern independent cinema, Soderbergh is an acclaimed and prolific filmmaker.',
      birthYear: '1963',
      deathYear:'', 
    },
    year: '2000', 
    genre:'drama',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Erin_Brockovich_%28film_poster%29.jpg',
    featured: true
  },
  {
    id: 5,
    title: 'Forrest Gump',
    description:'Forrest, a man with low IQ, recounts the early years of his life when he found himself in the middle of key historical events. All he wants now is to be reunited with his childhood sweetheart, Jenny.',
    director: {
      name:'Robert Zemeckis',
      bio: 'Robert Lee Zemeckis is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects.',
      birthYear: '1951',
      deathYear:'', 
    },
    year: '1994', 
    genre: 'comedy',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
    featured: true
  },
  {
    id: 6,
    title: 'Matilda',
    description:'Matilda shares a home with her parents and brother, who do not appreciate her. When her principal tortures her and a kind-hearted teacher, she uses her telekinetic powers to settle scores.',
    director: {
      name:'Danny DeVito',
      bio:'Daniel Michael DeVito Jr. is an American actor, comedian, director, producer, and screenwriter. He gained prominence for his portrayal of the taxi dispatcher Louie De Palma in the television series Taxi, which won him a Golden Globe Award and an Emmy Award.',
      birthYear: '1944',
      deathYear:'', 
    },
    year: '1996', 
    genre:'comedy',
    imageURL: 'https://m.media-amazon.com/images/M/MV5BZGVlYTA5NzQtMjBkNy00MmE1LWI3YzYtMTVkMTNmOGE5YmEwXkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg',
    featured: true
  },
  {
    id: 7,
    title: 'Jumanji',
    description:'Two children come across a magical board game. While playing it, they meet Alan, a man who was trapped in the game, and attempt to free him while facing different kinds of danger.',
    director: {
      name:'Joe Johnston',
      bio: 'Joseph Eggleston Johnston II is an American film director, writer, and visual effects artist best known for such effects-driven films as Honey, I Shrunk the Kids, Jumanji, and Jurassic Park III. These movies include a number of period films such as The Rocketeer, The Wolfman, and Captain America: The First Avenger.',
      birthYear: '1950',
      deathYear:'', 
    },
    year: '1995', 
    genre: 'action',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Jumanji_poster.jpg',
    featured: true
  },
  {
    id: 8,
    title: 'Taken',
    description:'An ex-Secret Service agent\'s teenage daughter is abducted by human traffickers while on a trip to Paris. With almost no information on her whereabouts, he travels to Paris to find and save her.',
    director: {
      name:'Pierre Morel',
      bio:'Pierre Morel is a French film director and cinematographer. His work includes District 13, From Paris with Love, and Taken.',
      birthYear: '1964',
      deathYear:'', 
    },
    year: '2008', 
    genre:'action',
    imageURL: 'https://lumiere-a.akamaihd.net/v1/images/image_efeee89d.jpeg',
    featured: false
  },
  {
    id: 9,
    title: 'The Green Mile',
    description:'Paul, the head guard of a prison, meets an inmate, John, an African American who is accused of murdering two girls. His life changes drastically when he discovers that John has a special gift.',
    director: {
      name:'Frank Darabont',
      bio:'Frank Árpád Darabont is a French-American film director, screenwriter and producer of Hungarian descent. He has been nominated for three Academy Awards and a Golden Globe Award.',
      birthYear: '1959',
      deathYear:'', 
    },
    year: '1999', 
    genre:'drama',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/e/e2/The_Green_Mile_%28movie_poster%29.jpg',
    featured: true
  },
  {
    id: 10,
    title: 'The Help',
    description:'Skeeter, an aspiring author, decides to write a book on African-American maids and the struggles they face on a daily basis.',
    director: {
      name:'Tate Taylor',
      bio:'Tate Taylor is an American filmmaker and actor. A frequent collaborator with his friends and prolific character actresses Allison Janney and Octavia Spencer, Taylor is best known for directing The Help, Get on Up, and The Girl on the Train.',
      birthYear: '1969',
      deathYear:'', 
    },
    year: '2011', 
    genre: 'drama',
    imageURL: 'https://upload.wikimedia.org/wikipedia/en/d/d3/The_Help_%282011_film%29.jpg',
    featured: true
  },
];

let users = [
  {
    id: 1,
    name: 'Test Account',
    email: 'testaccount@email.com',
    password: 'testaccountpw1',
    favorites: []
  },
  {
    id: 2,
    name: 'Test Account2',
    email: 'testaccount2@email.com',
    password: 'testaccountpw2',
    favorites: []
  },
];


module.exports = { movies, users }


