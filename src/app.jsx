import React from 'react';
import Router, { Route, DefaultRoute, Link, RouteHandler } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui, { AppBar } from 'material-ui';


var ThemeManager = new mui.Styles.ThemeManager();


class IndexPage extends React.Component {
    render() {
        return (<h2>Index</h2>);
    }
}


class ScoreboardPage extends React.Component {
    render() {
        return (<h2>Scoreboard</h2>);
    }
}


class App extends React.Component {
    static get childContextTypes() {
        return {
            muiTheme:React.PropTypes.object
        }
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    handleClick(event) {
        var a = 'Hello';
        var b = 'World';
        window.alert(`${a}, ${b}`)
    }

    render() {
        return (
            <div>
                <AppBar title="Hello World!"/>
                <nav>
                    <Link to="index">Index</Link>
                    <Link to="scoreboard">Scoreboard</Link>
                </nav>
                <main>
                    <RouteHandler/>
                </main>
                <button onClick={this.handleClick}>Alert!</button>
            </div>
        )
    }
}


let routes = (
    <Route handler={App}>
        <DefaultRoute name="index" handler={IndexPage}/>
        <Route name="scoreboard" path="scoreboard" handler={ScoreboardPage}/>
    </Route>
);

function render() {
    Router.run(routes, Router.HistoryLocation, (Root) => {
        React.render(<Root/>, document.getElementById('app'));
    });
}

injectTapEventPlugin();
render();
