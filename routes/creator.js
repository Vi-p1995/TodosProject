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
  message=lib.add(idCreatore,idAssegnatario,azioneDaSvolgere);
  if(message.status===400){
    res.status(400).json(message.message);
  }else{
    res.json(message.message);
  }
});

router.delete('/todo/:id',auth,function(req,res){
  id=parseInt(req.params.id);
  message=lib.del(id);
  if(message.status===400){
    res.status(400).json(message.message);
  }else{
    res.json(message.message);
  }
});

router.get('/todos',function(req,res){
  res.json(lib.todoList);
});

router.get('/todos/:id',auth,function(req,res){
  if(req.query.user==="creator"){
    message=lib.showTodosCreator(req.params.id);
    if(message.status===400){
      res.status(400).json(message.message);
    }else{
      res.json(message);
    }
  }else if(req.query.user==="assignee"){
    message=lib.showTodosAssignee(req.params.id);
    if(message.status===400){
      res.status(400).json(message.message);
    }else{
      res.json(message);
    }
  }else{
    res.status(401).json({message:"page not found"});
  }
});

router.put('/todo/setUncompleted/:id',auth,function(req,res){
  id=req.params.id;
  message=lib.setUncompleted(id);
  if(message.status===400){
    res.status(400).json(message.message);
  }else{
    res.json(message.message);
  }
});

router.get('/showTodos',auth,function(req,res){
  if(req.query.what==="completed"){
    message=lib.showCompletedTodos();
    if(message.status===400){
      res.status(400).json(message.message);
    }else{
      res.json(message);
    }
  }else if (req.query.what==="unCompleted"){
    message=lib.showUncompletedTodos();
    if(message.status===400){
      res.status(400).json(message.message);
    }else{
      res.json(message);
    }
  }else{
    res.status(401).json({message:"page not found"});
  }

});


module.exports=router;
