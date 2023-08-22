import React from 'react';
import Header from './Header';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_email_2360', 'template_tdlyvn3', form.current, 'vIwTUUERNgbqsJt4Q')
            .then((result) => {
                toast("Message Success");
            }, (error) => {
                toast("Message Failed");
            });
    };
    return (
        <div id='contact' style={{ height: "100vh" }}>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-sm-10 position-relative h-100 ">
                        <Header />
                        <div className="h-100 d-flex justify-content-center align-items-center w-100">
                            <div className="w-100">
                                <ToastContainer />
                                <h3 className='mb-3 text-light fs-1 text-center'>Let's <span className='color-me'>connect.</span></h3>
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <form ref={form} onSubmit={sendEmail} >
                                            <div class="row mb-3">
                                                <div class="col pe-1">
                                                    <input type="text" class="form-control" placeholder="Name" aria-label="name" name='user_name' />
                                                </div>
                                                <div class="col ps-1">
                                                    <input type="email" required class="form-control" placeholder="Email" aria-label="email" name='user_email' />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <input type="text" class="form-control" placeholder="subject" aria-label="subject" name='user_subject' />
                                            </div>
                                            <div className='mb-3'>
                                                <textarea required class="form-control" placeholder="message" name='message' style={{ background: "none", height: "100px" }} id="floatingTextarea"></textarea>
                                            </div>
                                            <div></div>
                                            <input type="submit" value={"Let's talk"} className='btn px-5 py-2 rounded-pill' />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;