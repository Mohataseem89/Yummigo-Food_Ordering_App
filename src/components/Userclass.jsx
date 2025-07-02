import React from "react";
import { Link } from "react-router-dom";
//not related to the application
//just to learn class based components
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log("UserClass Constructor")
    // console.log(props)
    this.state = {
      user: {
        name: "mkhan",
        location: "mumbaijjjj",
        avatar_url: "https://avatars.githubusercontent.com/u/100000000?v=4",
      },
      //   count: 11,
      // count2: "mohataseem khan class wala state",
    };
    // console.log("child constructor");
  }

  async componentDidMount() {
    // console.log("child component did mount");
    // console.log(this.props.name +"child component did mount");
    //this componet is use to fetch data from api
    const data = await fetch("https://api.github.com/users/mohataseem89");
    const json = await data.json();
    this.setState({
      user: json,
    });
    console.log(json);
  }
  componentDidUpdate() {
        console.log("child component did update");
    }
    componentWillUnmount() {
        console.log("child component willmount");
    }

  render() {
    // const { name, location } = this.props;
    // const { count, count2 } = this.state;
    const { name, location, avatar_url, html_url } = this.state.user;

    // console.log("child render");
    return (
      <div className="about-card">
        {/* <h1>class wala</h1> */}
        {/* <h1>count={this.state.count}</h1> */}
        {/* <h1>count={count}</h1> */}
        {/* <button onClick={() => {
            this.setState({ count: count + 1 }); */}
        {/* // this.setState({count2: "mohataseem khan class wala state"}) */}
        {/* }}>count+</button> */}
        {/* <button onClick={() => {
            this.setState({ count: count - 1 });
        }}>count-</button> */}
        {/* <h1>count={count2}</h1> */}
        {/* <h2>Name: Mohataseem Khan</h2> */}
        {/* <h2>Name: {this.props.name}</h2> */}
        <img src={avatar_url} alt="User Avatar" className="user-avatar" />
        <h2>Name: {name}</h2>
        {/* <h3>Location: Mumbai</h3> */}
        {/* <h3>Location: {this.props.location}</h3> */}
        <h3>Location: {location}</h3>
        <Link to={html_url}>
          {" "}
          <h4>@mohataseem89</h4>
        </Link>
        {/* <img src={avatar_url} alt="" /> */}
        {/* <img src="https://avatars.githubusercontent.com/u/100000000?v=4" alt="" /> */}
      </div>
    );
  }
}

export default UserClass;
