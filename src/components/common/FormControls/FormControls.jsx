import React from 'react';
import s from './FormControls.module.css';

export const InputStandard = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <div>
                <input {...input} {...props} className={s.stdInput + ' ' + (hasError ? s.error : '')}/>
            </div>
            {/*<span>{hasError && meta.error}</span>*/}
        </div>
    )
};