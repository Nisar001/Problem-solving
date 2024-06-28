import express, { json } from 'express'
import deepClone from './problems/DeepClone.js'
import throttle from './problems/ThrottleFunc.js'
import rotateMatrix90d from './problems/RotateMatrix90.js'
import flattenArray from './problems/FlattenArray.js'


const app = express()

app.use(express.json())

// deepclone API
app.post('/api/deepClone', (req, res)=>{
   const original = req.body;
   const cloned = deepClone(original);
   res.json(cloned)
})

// flattern array API
app.post('/api/flattenArray', (req, res) => {
   const nestedArray = req.body.array;
   const flattenedArray = flattenArray(nestedArray);
   res.json(flattenedArray)
})

// throttle function API
let throttledFunc = null;
app.post('/api/throttle', (req, res) => {
   const { funcBody, wait} = req.body;
   const func = new Function('return ' + funcBody)();
   throttledFunc = throttle(func, wait);
   res.send('Finction Thrttle Successfully');
})

app.post('/api/throttleCall', (req, res) => {
   if(throttledFunc){
      const result = throttledFunc(...req.body.args);
      res.json(result)
   } else{
      res.send("No throttked function set, Please set it first using apo/throttle")
   }
})

//Rotate Matrix API
app.post('/api/rotateMatrix', (req, res) => {
   const mat = req.body.matrix
   const rotateMatrix = rotateMatrix90d(mat);
   res.json(rotateMatrix)
})

const PORT = 8080
app.listen(PORT, ()=>{
   console.log(`Server is running on port ${PORT}`)
})
