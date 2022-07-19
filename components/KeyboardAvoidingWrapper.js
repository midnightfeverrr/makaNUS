// Import Statements
import react from "react";
import { 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard 
} from "react-native";

/**
 * Anonymous class 
 *
 * @param {*} children Page Render
 * @returns Render of KeyboardAvoidingWrapper
 */
const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper