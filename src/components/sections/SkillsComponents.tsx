import React, { ReactElement, useMemo, useState } from "react";
import { HTMLAttributes } from "react";

const SkillsCategoryContainer: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (
        <div id='skills-category'>
            <h3>{title}</h3>
            <div id='skills-grid'>
                {children}
            </div>
        </div>
    )
}

const SkillsComponentRegistry = {
    skillscategorycontainer: (props: HTMLAttributes<HTMLElement>) => { 
        // console.log(props);
        return <SkillsCategoryContainer {...props} title={props.title || ''} children={props.children}></SkillsCategoryContainer>;
    },
    

};

export default SkillsComponentRegistry;