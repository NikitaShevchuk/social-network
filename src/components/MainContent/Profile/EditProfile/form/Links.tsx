import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useMemo, useRef } from 'react';
import classNames from 'classnames';
import style from '../../Profile.module.scss';
import useOnClickOutside from '../../../../../hooks/onClickOutside';
import { shouldReturnEmpty } from './utils';
import { createInput } from '../../../../../common/helpers/createField';
import { isLink } from '../../../../../common/helpers/validators';
import { ContactsArray } from '../../../../../types/ProfileTypes';
import { RootState } from '../../../../../redux/redux-store';
import { setSocialMediaEditMode } from '../../../../../redux/reducers/profile-reducer/actions';

interface Props {
    contactsArray: ContactsArray;
}

const Links: FC<Props> = ({ contactsArray }) => {
    const dispatch = useDispatch();
    const { socialMediaEditMode } = useSelector((state: RootState) => state.profilePage);
    const editSocialMediaClassName = socialMediaEditMode
        ? style.additionalInfActive
        : style.additionalInf;

    const formRef = useRef<HTMLDivElement | null>(null);
    const toggleEditMode = (editMode: boolean) => dispatch(setSocialMediaEditMode(editMode));
    useOnClickOutside({
        callback: toggleEditMode,
        exceptions: ['edit-social-media'],
        ref: formRef
    });
    const mappedContactsArray = useMemo(() => {
        return contactsArray.map((singleContact) => {
            const contactName = singleContact[0];
            if (shouldReturnEmpty(contactName)) return '';
            return createInput([isLink], 'text', singleContact[0], singleContact[0]);
        });
    }, []);
    return (
        <div ref={formRef} className={classNames(editSocialMediaClassName, 'links-form')}>
            {mappedContactsArray}
        </div>
    );
};

export default Links;
