
LoremIpsum.WORDS = [
		'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
		'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
		'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
		'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
		'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 
		'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
		'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
		'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
		'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
		'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
		'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
		'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
		'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 
		'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
		'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam',
		'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
		'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
		'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
		'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
		'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
		'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
		'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
		'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
		'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
		'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
		'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
		'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
		'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
		'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
		'elementum', 'tempor', 'risus', 'cras'
];

LoremIpsum.prototype.singleWord = function () {
  var position = Math.floor(Math.random() * LoremIpsum.WORDS.length);
  var word = LoremIpsum.WORDS[position];
  return word.charAt(0).toUpperCase() + word.slice(1);
}

LoremIpsum.prototype.generate = function (num_words) {
	var words, ii, position, word, current, sentences, sentence_length, sentence;
	num_words = num_words || 100;
	
	words = [LoremIpsum.WORDS[0], LoremIpsum.WORDS[1]];
	num_words -= 2;
	
	for (ii = 0; ii < num_words; ii++) {
		position = Math.floor(Math.random() * LoremIpsum.WORDS.length);
		word = LoremIpsum.WORDS[position];
		
		if (ii > 0 && words[ii - 1] === word) {
			ii -= 1;
			
		} else {
			words[ii] = word;
		}
	}
	
	sentences = [];
	current = 0;
	
	while (num_words > 0) {
		sentence_length = this.getRandomSentenceLength();
		
		if (num_words - sentence_length < 4) {
			sentence_length = num_words;
		}
		
		num_words -= sentence_length;
		
		sentence = [];
		
		for (ii = current; ii < (current + sentence_length); ii++) {
			sentence.push(words[ii]);
		}
		
		sentence = this.punctuate(sentence);
		current += sentence_length;
		sentences.push(sentence.join(' '));
	}
	
	return sentences.join(' ');
};

LoremIpsum.prototype.punctuate = function (sentence) {
	var word_length, num_commas, ii, position;
	
	word_length = sentence.length;

	sentence[word_length - 1] += '.';
	
	if (word_length < 4) {
		return sentence;
	}
	
	num_commas = this.getRandomCommaCount(word_length);
	
	for (ii = 0; ii <= num_commas; ii++) {
		position = Math.round(ii * word_length / (num_commas + 1));
		
		if (position < (word_length - 1) && position > 0) {
			/* Add the comma. */
			sentence[position] += ',';
		}
	}
	
	/* Capitalize the first word in the sentence. */
	sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
	
	return sentence;
};

LoremIpsum.prototype.getRandomCommaCount = function (word_length) {
	var base, average, standard_deviation;
	
	/* Arbitrary. */
	base = 6;
	
	average = Math.log(word_length) / Math.log(base);
	standard_deviation = average / base;
	
	return Math.round(this.gaussMS(average, standard_deviation));
};


LoremIpsum.prototype.getRandomSentenceLength = function () {
	return Math.round(
			this.gaussMS(
					LoremIpsum.WORDS_PER_SENTENCE_AVG,
					LoremIpsum.WORDS_PER_SENTENCE_STD
			)
	);
};

turn {number} Random number

LoremIpsum.prototype.gauss = function () {
	return (Math.random() * 2 - 1) +
			(Math.random() * 2 - 1) +
			(Math.random() * 2 - 1);
};


LoremIpsum.prototype.gaussMS = function (mean, standard_deviation) {
	return Math.round(this.gauss() * standard_deviation + mean);
};
