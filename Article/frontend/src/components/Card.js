import './Card.css';

const Card = ({ title, url, score, label }) => (
    <div className='card_container'>
      <a href={url}>{title}</a>
      <br></br>
      {score ? <span style={{"color": "#9b59b6"}}>Score: {score}</span> : ""}
      <br></br>
      {label ? <span style={{"color": "#2980b9"}}>Label: {label}</span> : ""}
    </div>
);

export default Card;