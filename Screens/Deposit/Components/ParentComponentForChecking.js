// ParentComponent.js
import React, { useState } from 'react';
import ReferenceNumber from './ReferenceNumber';
import ConfirmReferenceNumber from './ConfirmReferenceNumber';

const ParentComponent = () => {
    const [referenceNumber, setReferenceNumber] = useState('');

    return (
        <View>
            <ReferenceNumber
                value={referenceNumber}
                onChangeText={setReferenceNumber}
            />
            <ConfirmReferenceNumber referenceNumber={referenceNumber} />
        </View>
    );
};

export default ParentComponent;
