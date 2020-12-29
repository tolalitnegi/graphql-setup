# GraphQL Setup 

## setup
- nvm use 10
- npm i
- npm audit fix
- npm start

![alt GraphQl Architecture](https://firebasestorage.googleapis.com/v0/b/app-grpql.appspot.com/o/screenshot-dd%202020-12-29%20at%204.41.03%20PM.png?alt=media&token=fc730a7f-51c8-4036-b927-62879e877beb)

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

## redux replaced with apollo
- http://localhost:3000/shop 
- file collections-overview.container.jsx

