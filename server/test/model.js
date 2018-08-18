const Database = require('../lib/database');
const db = new Database({ storage: 'test.sqlite' });

// データたくさん作る
const testEnquete = async () => {
  const { Enquete, Question, Choice } = db.models;
  await db.instance.drop();
  await db.sync();

  // enquete
  for (let i=0; i<3; i++) {
    const enqueteData = {
      title: `test${i}`,
      description: 'foobar',
      enabled: true,
      order: 3 - i,
    };
    // create
    const enquete = await Enquete.create(enqueteData);

    // question
    const questions = [];
    for (let j=0; j<4; j++) {
      const questionData = {
        body: `question${j}`,
        type: 'single',
        order: j,
      };
      // create
      const question = await Question.create(questionData);

      const choices = [];
      for (let k=0; k<3; k++) {
        const choiceData = {
          body: `choice${k}`,
          order: k,
        };
        // create
        const choice = await Choice.create(choiceData);
        choices.push(choice);
      }

      await question.setChoices(choices);
      questions.push(question);
    }

    // setQuestion
    await enquete.setQuestions(questions);
    
    console.log('created: ', enquete.get('id'));
  }

  // select
  const result = await Enquete.findAll({
    order: [
      ['order', 'ASC']
    ],
    include: [
      {
        model: Question,
        include: [
          {
            model: Choice,
          },
        ]
      },
    ]
  });
  console.log('count: ', result.length);

  result.forEach((item) => {
    console.log(JSON.stringify(item.get({ plain: true })));
  });
};

testEnquete().then(() => {
  console.log('ok');
}).catch((err) => {
  console.error(err);
});
