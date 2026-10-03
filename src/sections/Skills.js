import Split from "../components/fx/Split";
import Toolbox from "../components/skills/Toolbox";
import { toolbox } from "../data";
import { Dome, Label } from "./Bits";

export default function Skills() {
  return (
    <section className="pf-skills pf-section" id="skills">
      <Dome color="bone" />
      <div className="pf-wrap">
        <Label n="03" className="pf-label--ink">Toolbox</Label>
        <Split text="The toolbox. *Go on,* throw it around." className="pf-h2 pf-h2--ink" />
        <p className="pf-skills__hint pf-label pf-label--ink">Real rigid-body physics. Grab a tag and toss it.</p>
      </div>
      <div className="pf-wrap pf-wrap--wide">
        <Toolbox items={toolbox} />
      </div>
    </section>
  );
}
