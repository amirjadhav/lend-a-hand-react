import { Card, Button } from 'react-bootstrap';

export default function CardComponent(props) {
	return (
		<Card id='card' bg='light' style={props.cardStyle}>
			<Card.Header id='card-header'>
				<Card.Title id='card-title'> {props.title}</Card.Title>
			</Card.Header>
			<Card.Text>{props.description}</Card.Text>
			<Card.Body id='card-body'>{props.body}</Card.Body>

			<Card.Footer id='card-footer'>
				<Button variant='outline-primary' id={props.id} onClick={props.action}>
					{props.btnName}
				</Button>
			</Card.Footer>
		</Card>
	);
}
