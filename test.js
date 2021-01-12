const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('slowtvDB','slowtv','slowtv1234',{
  host:'slowtv.cqks0p32qnan.ap-northeast-2.rds.amazonaws.com',
dialect: 'mysql',
  port:'13306',
});
auto.run((err)=>{
  if(err) throw err;
})
