import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';
import './chatBot.css';

function CustomChatbot(props) {
    const config = {
      width: "300px",
      height: "400px",
      floating: true
    };

    const theme = {
      background: '#ffffff',
      fontFamily: 'Montserrat',
      headerBgColor: 'linear-gradient(147deg, #000000 0%, #434343 74%)',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: 'linear-gradient(147deg, #000000 0%, #434343 74%)',
      botFontColor: '#ffffff',
      userBubbleColor: '#f2f2f2',
      userFontColor: '#434343',
    };
    
    const steps = [
       {
        id: "Greet",
        message: "Hello, Welcome to our library",
        trigger: "Done"
       },
       { 
        id: "Done",
        message: "Categories of book ?",
        trigger: "Books"
       },
       {
         id: "Books",
         options: [
           { value : 'autobiography', label : 'Autobiography', trigger: 'Autob'},
           { value : 'scifi', label : 'Science - Fiction', trigger: 'SciFi'},
           { value : 'health', label : 'Health - Mind - Body', trigger: 'health'}
        ],
       },
       
       {
        id:"Autob",
        message: "Great Choice, by selecting the book it will get reserved!",
        trigger: 'Autobiography'
       },

      {
        id: "Autobiography",
        options: [
          { value : 'agni', label : 'Agni Ki Udan', trigger: 'auto1'},
          { value : 'ben', label : 'Benjamin-Franklin', trigger: 'auto2'},
          { value : 'store', label : 'The Story of my experiments', trigger: 'auto3'},
          { value : 'chronic', label : 'The Chronicles', trigger: 'auto4'},
          { value : 'e2', label : 'I know why the cage bird sings', trigger: 'auto5'},
          { value : 'r4', label : 'The autobiography of malcom', trigger: 'auto6'},
          { value : 'ag1', label : 'Agatha Christie', trigger: 'auto7'},
          { value : 'ager1', label : 'Andre Agassi', trigger: 'auto8'},
          { value : 'mem1', label : 'A Memoir of the Craft by Stephen King', trigger: 'auto9'},
          { value : 'fea1', label : 'A Moveable Feast by Ernest Hemingway', trigger: 'auto10'},
          { value : 'mark1', label : 'Autobiography of Mark Twain by Mark Twain', trigger: 'auto11'},
          { value : 'ozz1', label : 'I Am Ozzy by Ozzy Osbourne', trigger: 'auto12'},
          { value : 'adolf1', label : 'Mein Kampf by Adolf Hitler', trigger: 'auto13'},
          { value : 'dera1', label : 'Dreams from my Father by Barack Obama', trigger: 'auto14'},
          { value : 'adnkj2', label : 'Why I Am An Atheist', trigger: 'auto15'} 
        ],
      },
             
      {
        id: "auto1",
        message: "Agni Ki Udaan will get reserved! ",
        trigger: "ud"
      },       
       
      {
        id: "ud",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "auto2",
        message: "Benjamin Franklin will get reserved! ",
        trigger: "ben1"
      },       
      
      {
        id: "ben1",
        message: "Reserved",
        end: true,
      }, 
      
      {
        id: "auto3",
        message: "The Story of my experiments will get reserved! ",
        trigger: "exp1"
      },       
      
      {
        id: "exp1",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "auto4",
        message: "The Chronicles will get reserved! ",
        trigger: "ch1"
      },       
      {
        id: "ch1",
        message: "Reserved",
        end: true,
      }, 
      
      {
        id: "auto5",
        message: "I know why the cage bird sings will get reserved! ",
        trigger: "knw1"
      },       
      {
        id: "knw1",
        message: "Reserved",
        end: true,
      }, 
         
      {
        id: "auto6",
        message: "The autobiography of malcom will get reserved! ",
        trigger: "knw1"
      },       
      {
        id: "knw1",
        message: "Reserved",
        end: true,
      }, 
         
      {
        id: "auto7",
        message: "Agatha Christie will get reserved! ",
        trigger: "ad1"
      },       
      {
        id: "ad1",
        message: "Reserved",
        end: true,
      },      

      {
        id: "auto8",
        message: "Andre Agaasi will get reserved! ",
        trigger: "agdf1"
      },       
      {
        id: "agdf1",
        message: "Reserved",
        end: true,
      },

      {
        id: "auto9",
        message: "A Memoir of the Craft by Stephen King ",
        trigger: "meme1"
      },       
      {
        id: "meme1",
        message: "Reserved",
        end: true,
      },


      {
        id: "auto10",
        message: "A Moveable Feast by Ernest Hemingway ",
        trigger: "erne1"
      },       
      {
        id: "erne1",
        message: "Reserved",
        end: true,
      },


      {
        id: "auto11",
        message: "Autobiography of Mark Twain by Mark Twain ",
        trigger: "twain1"
      },       
      {
        id: "twain1",
        message: "Reserved",
        end: true,
      },

      {
        id: "auto12",
        message: "I Am Ozzy by Ozzy Osbourne",
        trigger: "ozz1"
      },       
      {
        id: "ozz1",
        message: "Reserved",
        end: true,
      },

      {
        id: "auto13",
        message: "Mein Kampf by Adolf Hitler",
        trigger: "kampf1"
      },       
      {
        id: "kampf1",
        message: "Reserved",
        end: true,
      },

      {
        id: "auto14",
        message: "Dreams from my Father by Barack Obama",
        trigger: "fath1"
      },       
      {
        id: "fath1",
        message: "Reserved",
        end: true,
      },
      {
        id: "auto15",
        message: "Dreams from my Father by Barack Obama",
        trigger: "fath1"
      },       
      {
        id: "fath1",
        message: "Reserved",
        end: true,
      },













      {
        id:"SciFi",
        message: "Great Choice, by selcting the book it will get reserved!",
        trigger: "Scifiction"
      },
       
      {
        id: "Scifiction",
        options: [
          {value: "dune", label: "Dune", trigger: "sci1"},
          {value: "adas1", label: "Nineteen-Eight Four", trigger: "sci2"},
          {value: "awer1", label: "The Lord of the Rings", trigger: "sci3"},
          {value: "bnui1", label: "The Hitchhiker's guide to the Galaxy", trigger: "sci4"},
          {value: "niy1", label: "Ender's Game", trigger: "sci5"},
          {value: "acakj1", label: "The Dune Chronicles", trigger: "sci6"},
          {value: "cakh1", label: "A song of Ice and Fire Series", trigger: "sci7"},
          {value: "cacmb1", label: "Fahrenheit 451", trigger: "sci8"},
          {value: "camkm1", label: "The Foundation Trilogy", trigger: "sci9"},
          {value: "lopd1", label: "Brave New World", trigger: "sci10"},
          {value: "pojr1", label: "American Gods", trigger: "sci11"},
          {value: "vsmm1", label: "The Princess Bride", trigger: "sci12"},
          {value: "vmfsa1", label: "The Wheel of Time Series", trigger: "sci13"},
          {value: "dadc1", label: "Animal Farm", trigger: "sci14"},
          {value: "cabe1", label: "Neuromancer", trigger: "sci15"}

        ],
      },
    
      {
        id: "sci1",
        message:"Dune will get reserved!",
        trigger: "nt"
      },
       
      {
        id: "nt",
        message: "Reserved",
        end: true,
      },      

    
      {
        id: "sci2",
        message:"Nineteen-Eight Four will get reserved!",
        trigger: "ttt"
      },
       
      {
        id: "ttt",
        message: "Reserved",
        end: true,
      },      
    
      {
        id: "sci3",
        message:"The Lord of the Rings will get reserved!",
        trigger: "cakr"
      },
       
      {
        id: "cakr",
        message: "Reserved",
        end: true,
      },      
      
    
      {
        id: "sci4",
        message:" The Hitchhiker's guide to the Galaxy will get reserved!",
        trigger: "guide"
      },
       
      {
        id: "guide",
        message: "Reserved",
        end: true,
      },      

      {
        id: "sci5",
        message:" The Ender's Game will get reserved!",
        trigger: "andrew"
      },
       
      {
        id: "andrew",
        message: "Reserved",
        end: true,
      },      

      {
        id: "sci6",
        message:" The Dune Chronicles will get reserved!",
        trigger: "re12"
      },
       
      {
        id: "re12",
        message: "Reserved",
        end: true,
      },      

      {
        id: "sci7",
        message:" A Song of Ice and Fire series will get reserved!",
        trigger: "icer1"
      },
       
      {
        id: "icer1",
        message: "Reserved",
        end: true,
      },      
      
      {
        id: "sci8",
        message:" Fahrenheit 451 will get reserved!",
        trigger: "48"
      },
       
      {
        id: "48",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "sci9",
        message:" The Foundation Trilogy will get reserved!",
        trigger: "foundation"
      },
       
      {
        id: "foundation",
        message: "Reserved",
        end: true,
      },       

      {
        id: "sci10",
        message:" Brave new world will get reserved!",
        trigger: "60"
      },
       
      {
        id: "60",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "sci11",
        message:" American Gods will get reserved!",
        trigger: "100"
      },
       
      {
        id: "100",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "sci12",
        message:" The Princess Bride will get reserved!",
        trigger: "101"
      },
       
      {
        id: "101",
        message: "Reserved",
        end: true,
      },       

      {
        id: "sci13",
        message:" The Wheel of Time series will get reserved!",
        trigger: "102"
      },
       
      {
        id: "102",
        message: "Reserved",
        end: true,
      },       

      {
        id: "sci14",
        message:" Animal Farm will get reserved!",
        trigger: "103"
      },
       
      {
        id: "103",
        message: "Reserved",
        end: true,
      }, 

      {
        id: "sci15",
        message:" Neuromancer will get reserved!",
        trigger: "104"
      },
       
      {
        id: "104",
        message: "Reserved",
        end: true,
      }, 








      {
        id : "health",
        message : "Great Choice, by selecting the book it will get reserved!",
        trigger : "heale" 
      },

      {
        id: "heale",
        options: [
           {value: "course", label: "A Course in Weight Loss", trigger: "heal1"},
           {value: "sleep", label: "The Sleep Revolution", trigger: "heal2"},
           {value: "eat", label: "Eat the Yolks", trigger: "heal3"},
           {value: "zebras", label: "Why Zebras don't get Ulcers", trigger: "heal4"},
           {value: "gift", label: "The Gifts of Imperfection", trigger: "heal5"},
           {value: "four", label: "The Four Agreements", trigger: "heal6"},
           {value: "who", label: "Who moved my cheese", trigger: "heal7"},
           {value: "sleep", label: "Burnt Hills", trigger: "heal8"},
           {value: "the", label: "The Alchemist", trigger: "heal9"},
           {value: "sleep", label: "The Gun", trigger: "heal10"},
           {value: "breath", label: "Why Breath Becomes Air", trigger: "heal11"},
           {value: "planet", label: "The Planet Paradox", trigger: "heal12"},
           {value: "brain", label: "Idiot Brain", trigger: "heal13"},
           {value: "big", label: "Big Magic", trigger: "heal14"},
           {value: "buddha", label: "Buddha's Brain", trigger: "heal15"}
         ],
      },
       
      {
        id:"heal1",
        message:"A Course in Weight Loss will get reserved",
        trigger: "cou1"
      },
       
      {
        id: "cou1",
        message: "Reserved",
        end: true,
      },       

      {
        id:"heal2",
        message:"The Sleep Revolution will get reserved",
        trigger: "sleep1"
      },
      
      {
        id: "sleep1",
        message: "Reserved",
        end: true,
      },       

      {
        id:"heal3",
        message:" Eat the Yolks will get reserved",
        trigger: "yolk1"
      },
      
      {
        id: "yolk1",
        message: "Reserved",
        end: true,
      },       

      {
        id: "heal4",
        message:" Why Zebras don't get Ulcers will get reserved1",
        trigger: "ul1"
      },
       
      {
        id: "ul1",
        message: "Reserved",
        end: true,
      },       

      {
        id: "heal5",
        message:" The Gifts of Imperfection will get reserved1",
        trigger: "imp1"
      },
       
      {
        id: "imp1",
        message: "Reserved",
        end: true,
      },       

      {
        id: "heal6",
        message:" The Four Agreements will get reserved1",
        trigger: "fou1"
      },
       {
        id: "fou1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal7",
        message:" Who moved my cheese will get reserved1",
        trigger: "che1"
       },
       {
        id: "che1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal8",
        message:" Burnt Hills will get reserved1",
        trigger: "bur1"
       },
       {
        id: "bur1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal9",
        message:" The Alchemist will get reserved1",
        trigger: "alce1"
       },
       {
        id: "alce1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal10",
        message:" The Gun will get reserved1",
        trigger: "gun1"
       },
       {
        id: "gun1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal11",
        message:" Why Breath Becomes Air will get reserved1",
        trigger: "bre1"
       },
       {
        id: "bre1",
        message: "Reserved",
        end: true,
      },       

      {
        id: "heal12",
        message:" The Planet Paradox will get reserved1",
        trigger: "pla1"
       },
       {
        id: "pla1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal13",
        message:" Idiot Brain will get reserved1",
        trigger: "ido1"
       },
       {
        id: "ido1",
        message: "Reserved",
        end: true,
      },       

       {
        id: "heal14",
        message:" Big Magic will get reserved1",
        trigger: "mag1"
       },
       {
        id: "mag1",
        message: "Reserved",
        end: true,
      },       


      {
        id: "heal15",
        message:" Buddha's Brain will get reserved1",
        trigger: "mag1"
       },
       {
        id: "mag1",
        message: "Reserved",
        end: true,
      },      

     ];
    
    return <ThemeProvider theme={theme}><ChatBot steps={steps} {...config} /></ThemeProvider>;
   }
   export default CustomChatbot;