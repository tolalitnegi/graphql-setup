# GraphQL Setup 

## setup
nvm use 10
npm i
npm audit fix
npm start

#### Exposes single endpoint not like REST, all CRUDS operation to it.
- Query: get request / ask for data, not only what needed but the attributes also
- Mutation: POST / PUT
```
/graphQl - employeeDetails {
  name,
  empId,
  address: {
    city,
    postcode
  }
  age
}
```
- graphql schema , type of objects and attributes , ! means mandatory
```
- query {
   employees {
     name ,
     empId
   }
}
```
=> output is 
```
{
  "data": {
    "employees":{

    }
  }
}
```
- Graphql server sample https://github.com/ZhangMYihua/crwn-clothing-prisma
- https://www.apollographql.com/docs/tutorial/introduction/ 
