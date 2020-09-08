import React from 'react';

export class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({
			editMode: true
		});
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		});
		this.props.updateUserStatus(this.state.status)
	}

	onStatusChange = (e) => {
		this.setState({status: e.target.value})
	}

	componentDidMount() {
		const status = this.props.status ? this.props.status : '-----'
		this.setState({status})
	}

	render() {
		return (
			<>
				{this.state.editMode
					? <div>
							<input
								type={'text'}
								value={this.state.status}
								onBlur={this.deactivateEditMode}
								onChange={this.onStatusChange}
								autoFocus
							/>
						</div>
					: <div>
							<span
								onDoubleClick={this.activateEditMode}
							>{this.state.status}</span>
					</div>
				}


			</>
		);
	}
}
