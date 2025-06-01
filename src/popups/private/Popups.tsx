import React, { useEffect } from 'react';
import {
    StyleSheet,
} from 'react-native';
import ConfirmSignOut from './ConfirmSignOut';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../store/store';
import { confirmSignOutVisibilityAction } from '../../store/reducers/popups';
import ReportToManagement from './ReportToManagement';
import ShareFeedback from './ShareFeedback';
import SentSuccessfully from './SentSuccessfully';
import ShareFeedbackThankYou from './ShareFeedbackThankYou';

function Popups(): React.JSX.Element {
    return (
       <>
        <ConfirmSignOut />
        <ReportToManagement />
        <ShareFeedback />
        <SentSuccessfully />
        <ShareFeedbackThankYou />
       </>
    );
}

const styles = StyleSheet.create({
    
});

export default Popups;