import React from 'react'
import axios from 'axios'

class Liststudent extends React.Component {

    state = {
        students: [],
        ufirstname: '',
        ulastname: '',
        uplace: '',
        uid: ''
    }

    getStudents = () => {
        axios.get('http://localhost:5000/')
            .then(res => {
                // console.log(res)
                this.setState({ students: res.data })
            })
    }

    componentDidMount = () => {
        this.getStudents()
    }

    handleDelete = (id) => {
        axios.delete(`http://localhost:5000/students/${id}`)
            .then(res => {
                // console.log(res)
                window.location = ('/')
            })
    }

    handleupdate = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleModalUpdate = (e)=> {
        axios.put(`http://localhost:5000/students/${this.state.uid}`, {firstname:this.state.ufirstname, lastname:this.state.ulastname, place:this.state.uplace})
        .then(res=>{
            // console.log(res)
            this.setState({ufirstname:'', ulastname:'', uplace:''})
            window.location ='/'
        })
    }
    render() {
        return (
            <>
                {
                    this.state.students.map((student, id) => (
                        <div className="card p-3" style={{ width: '18rem', display: 'inline-flex', marginLeft: '15px', marginTop: '15px' }} key={id}>
                            <div className="card-body text-center">
                                <h5 className="card-title">First Name: {student.firstname}</h5>
                                <h6 className="card-subtitle mb-2">Last Name: {student.lastname}</h6>
                                <h6 className="card-subtitle mb-2">Place: {student.place}</h6>
                            </div>
                            <div className="card-footer text-center">
                                <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => this.setState({uid: student._id ,ufirstname: student.firstname, ulastname: student.lastname, uplace: student.place })}>
                                    Update
                                </button>
                                <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => this.handleDelete(student._id)}>Delete</button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Update Data</h5>
                                                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body container">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <form onSubmit={() => this.handlesubmit()}>
                                                            <input name="ufirstname" onChange={(e) => this.handleupdate(e)} className="form-control m-3" placeholder="First Name" value={this.state.ufirstname}></input>
                                                            <input name="ulastname" onChange={(e) => this.handleupdate(e)} className="form-control m-3" placeholder="Last Name" value={this.state.ulastname}></input>
                                                            <input name="uplace" onChange={(e) => this.handleupdate(e)} className="form-control m-3" placeholder="Place" value={this.state.uplace}></input>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-warning" onClick={(e)=>this.handleModalUpdate(e)}>Update</button>
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.setState({ufirstname:'', ulastname:'', uplace:''})}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </>

        )
    }
}

export default Liststudent
