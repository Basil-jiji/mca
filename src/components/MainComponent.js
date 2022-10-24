import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { actions } from 'react-redux-form';
import Header from "./Mainpages/HeaderComponent";
import Home from "./Mainpages/HomeComponent";
import Footer from "./Mainpages/FooterComponent";
import Contact from "./Mainpages/ContactComponent";
import Announcement from "./Mainpages/AnnouncementComponent";
import Post from "./Mainpages/PostComponent";
import SignUp from "./Login/SignUpComponent";
import Prayaana from "./Prayaana/PrayaanaComponent";
import { connect } from "react-redux";
import LoginMain from "./Login/LoginMainComponent";
import Pizada from "./Pizada/PizadaComponent";
import { addAnnouncement, fetchToppers, fetchPlacements, fetchPosts, fetchAnnouncements } from "../redux/ActionCreators";
import Admin from "./Admin/AdminRouteComponent"
import NewPost from "./NewPost/NewPostComponent";
import { Loading } from "./Loading/LoadingComponent";

//Fix Announcements ----- Now also check and verify the code for Fetch and Baseurl

const matchDispatchToProps = (dispatch) =>({
  addAnnouncement: (title, message) =>
  dispatch(addAnnouncement(title, message)),
  fetchToppers: () => {dispatch(fetchToppers())},
  fetchPlacements: () => {dispatch(fetchPlacements())},
  fetchPosts:() => {dispatch(fetchPosts())},
  fetchAnnouncements: () => {dispatch(fetchAnnouncements())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  resetPrayaanaForm: () => {dispatch(actions.reset('prayaana'))}
});

const mapStateToProps = state =>{
  return{
    toppers : state.toppers,
    placements: state.placements,
    announcements : state.announcements,
    posts: state.posts

  }
}

//Configure ADD_ANNOUNCEMENTS UNDER SHARED ONE ALSO


class Main extends Component{
    constructor(props){
      super(props);
    }

    componentDidMount(){
      this.props.fetchToppers();
      this.props.fetchPlacements();
      this.props.fetchAnnouncements();
      this.props.fetchPosts();
      
    }

  render(){
    
    const Homepage = () =>{
      return(
        <Home 
        topper={this.props.toppers.toppers}
        toppersLoading={this.props.toppers.isLoading}
        toppersErrMess={this.props.toppers.errMess}
        placement={this.props.placements.placements} 
        placementsLoading={this.props.placements.isLoading}
        placementsErrMess={this.props.placements.errMess}
        />
      )
    }


    return (
      <div className="App">
          <Header />
          <Switch>
            <Route path="/home" component={Homepage} />
            <Route exact path="/announcements" component={() => 
            <Announcement 
              announcement={this.props.announcements.announcements} />} />
            <Route exact path="/posts" component={() => 
              <Post 
                post={this.props.posts.posts} 
              
              />} />
            <Route exact path="/contactus" component={() => 
              <Contact 
                resetFeedbackForm={this.props.resetFeedbackForm}
              
              />} />
            <Route exact path="/login" component={() => <LoginMain />} />
            <Route exact path="/signup" component={() => <SignUp />} />
            <Route exact path="/prayaana" component={() => <Prayaana />} />
            <Route exact path="/pizada" component={() => <Pizada />} />
            <Route exact path="/newpost" component={() => <NewPost />} />
            <Route path="/admin" component={() => 
              <Admin 
                addAnnouncement={this.props.addAnnouncement}/>} />
            {/* <Route exact path="/load" component={()=><Loading />} /> */}
            <Redirect to="/home" />
          </Switch>
          <Footer />
      </div>
  );
}
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Main));
