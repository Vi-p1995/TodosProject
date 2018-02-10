var express = require('express');
var router= express.Router();
var lib = require('tododbvi');

var auth = function(req,res,next){
  if(req.query.token==="creator"){
    next();
  }else{
    res.status(401).json({
      message:"errore di autenticazione"
    });
  }
};

router.post('/todo',auth,function(req,res){
  idCreatore=req.body.idCreatore;
  idAssegnatario=req.body.idAssegnatario;
  azioneDaSvolgere=req.body.azioneDaSvolgere;
  res.json(lib.add(idCreatore,idAssegnatario,azioneDaSvolgere));
});

router.delete('/todo/:id',auth,function(req,res){
  id=parseInt(req.params.id);
  res.json(lib.del(id));
});

router.get('/todos',function(req,res){
  res.json(lib.todoList);
});

router.get('/todos/:id',auth,function(req,res){
  if(req.query.user==="creator"){
    res.json(lib.showTodosCreator(req.params.id));
  }else if(req.query.user==="assignee"){
    res.json(lib.showTodosAssignee(req.params.id));
  }else{
    res.status(401).json({message:"page not found"});
  }
});

router.put('/todo/setUncompleted/:id',auth,function(req,res){
  id=req.params.id;
  res.json(lib.setUncompleted(id));
});

router.get('/showTodos',auth,function(req,res){
  if(req.query.what==="completed"){
    res.json(lib.showCompletedTodos());
  }else if (req.query.what==="unCompleted"){
    res.json(lib.showUncompletedTodos());
  }else{
    res.status(401).json({message:"page not found"});
  }

});


module.exports=router;
