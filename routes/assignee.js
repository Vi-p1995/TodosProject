var express = require('express');
var router= express.Router();
var lib = require('tododbvi');

var auth = function(req,res,next){
  if(req.query.token==="assignee"){
    next();
  }else{
    res.status(401).json({
      message:"errore di autenticazione"
    });
  }
};

router.put('/todo/setCompleted/:id',auth,function(req,res){
  id=req.params.id;
  message=lib.setCompleted(id);
  if(message.status===400){
    res.status(400).json(message.message);
  }else{
    res.json(message.message);
  }
});

router.get('/showUncompletedTodos',auth,function(req,res){
  message=lib.showUncompletedTodos();
  if(message.status===400){
    res.status(400).json(message.message);
  }else{
    res.json(message);
  }
});

module.exports=router;
