import { NumberFieldFormElement } from "../fields/NumberField";
import { ParagraphFieldFormElement } from "../fields/ParagraphField";
import { SpacerFieldFormElement } from "../fields/SpacerField";
import { SeparatorFieldFormElement } from "../fields/SparetorField";
import { SubTitleFieldFormElement } from "../fields/SubTitleField";
import { TextAreaFieldFormElement } from "../fields/TextAreaField";
import { TextFieldFormElement } from "../fields/TextField";
import { TitleFieldFormElement } from "../fields/TitleField";

export type ElementsType = "TextField" |"TitleField" | "SubTitleField" | "ParagraphField"|"SeparatorField"|"SpacerField"|"NumberField"|"TextAreaField";



export type FormElement = {

    type: ElementsType,

    construct:(id:string)=>FormElementInstance

    designerBtnElement:{
        icon:React.ElementType,
        label:string
    }
    designerComponent: React.FC<{
        elementInstance:FormElementInstance
    }>;

    formComponent: React.FC<{
        elementInstance:FormElementInstance,
        submitValue? : (key:string,value:string)=>void
        isInvalid?:boolean;
        defaultValue?:string
    }>;
    propertiesComponent:React.FC<{
        elementInstance:FormElementInstance
    }>;


    validate:(formElement:FormElementInstance, currentValue:string)=>boolean

}

type FormElementsType = {
    [key in ElementsType]:FormElement
}

export type FormElementInstance = {
    id:string,
    type:ElementsType,
    extraAttributes?: Record<string,any>
}

export const FormElements:FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField:SubTitleFieldFormElement,
    ParagraphField:ParagraphFieldFormElement,
    SeparatorField:SeparatorFieldFormElement,
    SpacerField:SpacerFieldFormElement,
    NumberField:NumberFieldFormElement,
    TextAreaField:TextAreaFieldFormElement
};