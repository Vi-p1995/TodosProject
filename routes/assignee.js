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
  res.json(lib.setCompleted(id));
});

router.get('/showUncompletedTodos',auth,function(req,res){
  res.json(lib.showUncompletedTodos());
});

module.exports=router;
