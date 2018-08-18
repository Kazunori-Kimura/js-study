const Database = require('../lib/database');
const db = new Database({ storage: 'test.sqlite' });

// enquete
const testEnquete = async () => {
  const { Enquete } = db.models;
  await db.instance.drop();
  await db.sync();
  
  for (let i=0; i<3; i++) {
    const enquete = {
      title: `test${i}`,
      description: 'foobar',
      enabled: true,
      order: 3 - i,
    };
    
    // create
    const entity = await Enquete.create(enquete);
    console.log('created: ', entity.get('id'));
  }
  // select
  const result = await Enquete.findAndCountAll({
    order: [
      ['order', 'ASC']
    ],
  });
  console.log('count: ', result.count);

  result.rows.forEach((item) => {
    console.log('item: ', item.get({ plain: true }));
  });
};

testEnquete().then(() => {
  console.log('ok');
}).catch((err) => {
  console.error(err);
});
