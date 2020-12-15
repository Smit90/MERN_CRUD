import React from 'react'
import axios from 'axios'
import team from '../Images/team.png'

class Inputstudent extends React.Component {

    state = {
        firstname: '',
        lastname: '',
        place: ''
    }

    handlechange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
    }

    handlesubmit = () => {
        if (this.state.firstname !== '' && this.state.lastname !== '' && this.state.place !== '') {
            axios.post('http://localhost:5000/students', this.state)
                .then(res => {
                    console.log('Successfully posted')
                    this.setState({ firstname: '', lastname: '', place: '' })
                })
                window.location = ('/')
        }
    }

    render() {
        return (
            <div className="">
                <div className="row text-center">
                    <div className="col-md-4">
                        <form onSubmit={() => this.handlesubmit()}>
                            <input name="firstname" onChange={(e) => this.handlechange(e)} className="form-control m-3" placeholder="First Name" value={this.state.firstname}></input>
                            <input name="lastname" onChange={(e) => this.handlechange(e)} className="form-control m-3" placeholder="Last Name" value={this.state.lastname}></input>
                            <input name="place" onChange={(e) => this.handlechange(e)} className="form-control m-3" placeholder="Place" value={this.state.place}></input>
                            <button className="btn btn-outline-primary">Create</button>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <img alt="team" src={team} />
                    </div>
                </div>
            </div>

        )
    }
}

export default Inputstudent
