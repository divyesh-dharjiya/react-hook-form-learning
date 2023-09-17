"use client";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import dynamic from 'next/dynamic';

const DevTool = dynamic(() => import('@hookform/devtools').then((module) => module.DevTool), { ssr: false });

const Form = () => {
    const userForm = useForm({
        defaultValues: {
            username: '',
            email: '',
            channelName: '',
            socialMedia: {
                facebook: '',
                twitter: ''
            },
            phoneNumbers: ["", ""],
            age: null,
            date: new Date()
        },
        // mode: "onChange"
            // onBlur: "onBlur"
            // onChange: "onChange"
            // onSubmit: "onSubmit"
            // onTouched: "onTouched"
            // all: "all"
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = userForm;
    const { errors, isDirty, isValid, isSubmitSuccessful, isSubmitting } = formState;

    const onSubmit = (data) => {
        console.log('Form Submitted...', data);
    }

    const handleGetValues = () => {
        console.log("get Values", getValues());
    }

    const handleSetValues = () => {
        console.log("hello")
        setValue("username", "", {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    //Watch Code inside useEffect
    // const subscrption = watch((value) => {
    //     console.log(value);
    // });
    // return () => subscrption.unsubscribe();
    // [watch]

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]); 

    return (
        <div className="flex flex-col justify-center items-center">
            <form className='w-3/6' onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username" className='form-label'>Username: </label>
                <input type="text" id="username" {...register('username', {
                    disabled: true,
                    required: {
                        value: true,
                        message: 'Username is required.'
                    }
                })} />
                <p>{errors.username?.message}</p>

                <label htmlFor="email" className='form-label'>Email: </label>
                <input type="text" id="email" {...register('email', {
                    required: {
                        value: true,
                        message: 'Email is required.'
                    },
                    pattern: {
                        value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                        message: 'Please enter valid email'
                    },
                    validate: (fieldValue) => {
                        return ( fieldValue !== 'demo@example.com' ||  'Enter divyesh email address');
                    }
                })} />
                <p>{errors.email?.message}</p>

                <label htmlFor="channelName" className='form-label'>Channel Name: </label>
                <input type="text" id="channelName" {...register('channelName', {
                    required: {
                        value: true,
                        message: 'Channel Name is required*'
                    }
                })} />
                <p>{errors.channelName?.message}</p>

                <label htmlFor="facebook" className='form-label'>Facebook Profile: </label>
                <input type="text" id="facebook" {...register('socialMedia.facebook', {
                    required: {
                        value: true,
                        message: 'Facebook Profile is required*'
                    }
                })} />
                <p>{errors.socialMedia?.facebook?.message}</p>

                <label htmlFor="twitter" className='form-label'>Twitter Profile: </label>
                <input type="text" id="twitter" {...register('socialMedia.twitter', {
                    required: {
                        value: true,
                        message: 'Twitter Profile is required*'
                    }
                })} />
                <p>{errors.socialMedia?.twitter?.message}</p>

                <label htmlFor="primaryPhone" className='form-label'>Primary Phone Number: </label>
                <input type="text" id="primaryPhone" {...register('phoneNumbers.0')} />

                <label htmlFor="secondaryPhone" className='form-label'>Secondary Phone Number: </label>
                <input type="text" id="secondaryPhone" {...register('phoneNumbers.1')} />

                <label htmlFor="age" className='form-label'>Age: </label>
                <input type="number" id="age" {...register('age', {
                    valueAsNumber: true,
                    required: {
                        value: true,
                        message: 'Age is required*'
                    }
                })} />
                <p>{errors.age?.message}</p>

                <label htmlFor="date" className='form-label'>Date: </label>
                <input type="date" id="date" {...register('date', {
                    valueAsDate: true,
                    required: {
                        value: true,
                        message: 'Date is required*'
                    }
                })} />
                <p>{errors.date?.message}</p>

                <div>
                <button type='button' className='bg-pink-400 text-white my-3 w-72 p-3 mr-3' onClick={handleGetValues}>Get Values</button>
                <button type='button' className='bg-yellow-500 text-white my-3 w-72 p-3' onClick={handleSetValues}>Set Values</button>
                </div>
                {/* for disable button disabled={!isDirty || !isValid || isSubmitting} */}
                <div>
                <button type="button" className='bg-green-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white mr-3' onClick={() => reset()}>Reset Form</button>
                <button type='submit' className='bg-cyan-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white mr-3' onClick={() => trigger()}>Trigger</button>
                <button type='submit' className='bg-blue-600 mt-5 w-72 disabled:bg-blue-100 p-3 text-white'>Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default Form;