import React,{useState,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';


const alanKey = '0331def61a90339664644cebf7c37ebc2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = ()=>{
  const classes  = useStyles();

  const [newsArticles,setNewsArticles] = useState([]);
  const [activeArticle,setActiveArticle] =useState(-1) ;

  useEffect(()=>{alanBtn({
    key:alanKey,
    onCommand:({command,articles,number})=>{
      if(command==='newHeadlines'){
        setNewsArticles(articles)
        setActiveArticle(-1);
      }else if(command === 'highlight'){
        setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
      }else if(command==='open'){
        const parseNumber = number.length >2 ? wordsToNumbers(number,{fuzzy:true}):number;
        const article = articles[parseNumber-1];

        if(parseNumber >20){
          alanBtn().playText("Please try again.")
        }else if(article){
                  window.open(article.url,'_bkank');
                  alanBtn().playText('Opening...');
        }
      }
    }

  })},[])
  return(
    <div>
      <div className={classes.logoContainer}>
        <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="Alan Logo"/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}
export default App;