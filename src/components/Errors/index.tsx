import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../redux/redux-store';
import { clearAllErrors } from '../../redux/reducers/app-reducer/actions';

const ErrorsDisplay: FC<ErrorsConnectedProps> = ({ errors, clearAllErrors }) => {
    const clearErrors = () => clearAllErrors();
    if (!errors[0]) return <span />;
    return (
        <div className="errors-component opacity-animation">
            {errors &&
                errors.map((errorText: string) => (
                    <div
                        className="errors-component__single-error opacity-animation"
                        key={errorText}
                    >
                        {errorText}
                    </div>
                ))}
            <div className="errors-component__close-icon" onClick={clearErrors}>
                <FontAwesomeIcon icon={faClose} size="lg" />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    errors: state.app.errors
});

const connector = connect(mapStateToProps, { clearAllErrors });

export default connector(ErrorsDisplay);
type ErrorsConnectedProps = ConnectedProps<typeof connector>;
