import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Links, Link } from '../api/links';
import { Meteor } from 'meteor/meteor';

class Info extends React.Component<{
  links: Link[];
}> {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{links}</ul>
      </div>
    );
  }

  makeLink(link: Link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('links')
  return {
    links: Links.find().fetch(),
  };
})(Info);

// export default withTracker(() => {
// 	Meteor.subscribe('tasks');
// 	return {
// 		tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
// 		incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
// 		currentUser: Meteor.user()
// 	};
// })(App);
