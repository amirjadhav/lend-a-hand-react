import { Button, Modal } from 'react-bootstrap';

export default function ModalComponent(props) {
	console.log('props: ', props);

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id={`modal-${props?.modalId}`}>{props?.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props?.body}</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => {
						props?.onButtonClick();
						props?.onHide();
					}}
				>
					{props?.buttonLabel}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
