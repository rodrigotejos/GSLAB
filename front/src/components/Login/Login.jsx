import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const history = useHistory();
  return (
    <Fragment>
      {isShowingAlert ? (
        <Alert
          variant="danger"
          onClose={() => setIsShowingAlert(false)}
          dismissible
        >
          <Alert.Heading>Usuario e/ou Senha Incorreto!</Alert.Heading>
        </Alert>
      ) : undefined}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              logar para entrar
            </h2>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (values.email === "") {
                errors.email = "Faltou o Email";
              } else if (values.password === "") {
                errors.password = "Faltou a Senha";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              console.log(values);
              try {
                delete axios.defaults.headers.common["Sec-Fetch-Mode"];
                const response = await axios.post("api/login", values, {
                  headers: { "Content-Type": "application/json" },
                });
                console.log("login tela", response);
                Cookie.set("token", response.data.token);
                Cookie.set("nome", response.data.name);
                history.push("/");
              } catch (error) {
                setIsShowingAlert(true);
              }
            }}
          >
            {({ errors, touched, isValidating, values, handleSubmit }) => {
              console.log("values", values);
              console.log("errors", errors);
              console.log("erros verify", Object.keys(errors).length === 0);
              return (
                <Form
                  className="mt-8 space-y-6"
                  onClick={() => console.log("sua api")}
                >
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label hemltFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <Field
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email"
                      />
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Senha"
                      />
                      {errors.password && touched.password && (
                        <div>{errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleSubmit}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      logar
                    </button>

                    <button
                      type="submit"
                      className=" w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => history.push("/create")}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Criar Usuario
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
