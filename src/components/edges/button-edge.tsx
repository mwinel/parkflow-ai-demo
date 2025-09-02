import { memo } from "react";
import { EdgeProps } from "@xyflow/react";
import { MousePointerClick } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonEdge as ButtonEdgeComponent } from "@/components/ui/button-edge";

const ButtonEdge = memo((props: EdgeProps) => {
  const onEdgeClick = () => {
    window.alert(`Edge has been clicked!`);
  };

  return (
    <ButtonEdgeComponent {...props}>
      <Button onClick={onEdgeClick} size="icon" variant="secondary">
        <MousePointerClick size={16} />
      </Button>
    </ButtonEdgeComponent>
  );
});

export default ButtonEdge;
