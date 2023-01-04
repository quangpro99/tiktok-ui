import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route lấy ra từ publicRoutes bên routes gồm 2 key path */}
                    {publicRoutes.map((route, index) => {
                        //Nếu layout bằng null thì làm j đó để không có layout và ngược lại nếu có layout thì cho default layout
                        //Không có layout bằng cách dùng Fragment(chỉ dùng để chứa)
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        /* const Layout =
                        route.layout === null ? Fragment : DefaultLayout; */

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
