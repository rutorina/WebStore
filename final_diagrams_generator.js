const fs = require('fs');

// Function to properly escape XML content
function escapeXML(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Function to create a valid draw.io XML file
function createDrawioFile() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2025-01-05T12:00:00.000Z" agent="5.0" etag="generated" version="24.7.17" type="device">
  <diagram name="Діаграма випадків використання" id="use-case-diagram">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Система -->
        <mxCell id="system" value="Інтернет-магазин" style="swimlane;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="200" y="100" width="400" height="500" as="geometry"/>
        </mxCell>
        
        <!-- Випадки використання -->
        <mxCell id="uc1" value="Перегляд товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="system">
          <mxGeometry x="50" y="50" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc2" value="Пошук товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="system">
          <mxGeometry x="230" y="50" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc3" value="Додавання в кошик" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="system">
          <mxGeometry x="50" y="150" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc4" value="Оформлення замовлення" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="system">
          <mxGeometry x="230" y="150" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc5" value="Керування товарами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="system">
          <mxGeometry x="50" y="250" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc6" value="Керування замовленнями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="system">
          <mxGeometry x="230" y="250" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc7" value="Реєстрація користувача" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="system">
          <mxGeometry x="50" y="350" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="uc8" value="Авторизація" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="system">
          <mxGeometry x="230" y="350" width="120" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Актори -->
        <mxCell id="user" value="Покупець" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="80" y="250" width="30" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="admin" value="Адміністратор" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="700" y="250" width="30" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Зв'язки користувача -->
        <mxCell id="edge1" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge2" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc2">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge3" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc3">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge4" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc4">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge5" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc7">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge6" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="user" target="uc8">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <!-- Зв'язки адміністратора -->
        <mxCell id="edge7" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="admin" target="uc5">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge8" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="admin" target="uc6">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="edge9" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="admin" target="uc8">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
  
  <diagram name="Діаграма класів" id="class-diagram">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Клас User -->
        <mxCell id="class1" value="User&#xa;&#xa;+ id: int&#xa;+ name: string&#xa;+ email: string&#xa;+ password: string&#xa;+ created_at: datetime&#xa;&#xa;+ orders(): Order[]&#xa;+ cartItems(): CartItem[]" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="160" height="150" as="geometry"/>
        </mxCell>
        
        <!-- Клас Product -->
        <mxCell id="class2" value="Product&#xa;&#xa;+ id: int&#xa;+ name: string&#xa;+ description: text&#xa;+ price: decimal&#xa;+ image: string&#xa;+ category_id: int&#xa;&#xa;+ category(): Category&#xa;+ orderItems(): OrderItem[]&#xa;+ cartItems(): CartItem[]" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="300" y="50" width="180" height="180" as="geometry"/>
        </mxCell>
        
        <!-- Клас Category -->
        <mxCell id="class3" value="Category&#xa;&#xa;+ id: int&#xa;+ name: string&#xa;+ description: text&#xa;+ created_at: datetime&#xa;&#xa;+ products(): Product[]" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="550" y="50" width="160" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Клас Order -->
        <mxCell id="class4" value="Order&#xa;&#xa;+ id: int&#xa;+ user_id: int&#xa;+ total: decimal&#xa;+ status: string&#xa;+ created_at: datetime&#xa;&#xa;+ user(): User&#xa;+ orderItems(): OrderItem[]" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="50" y="300" width="160" height="150" as="geometry"/>
        </mxCell>
        
        <!-- Клас OrderItem -->
        <mxCell id="class5" value="OrderItem&#xa;&#xa;+ id: int&#xa;+ order_id: int&#xa;+ product_id: int&#xa;+ quantity: int&#xa;+ price: decimal&#xa;&#xa;+ order(): Order&#xa;+ product(): Product" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="300" y="300" width="160" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Клас CartItem -->
        <mxCell id="class6" value="CartItem&#xa;&#xa;+ id: int&#xa;+ user_id: int&#xa;+ product_id: int&#xa;+ quantity: int&#xa;+ created_at: datetime&#xa;&#xa;+ user(): User&#xa;+ product(): Product" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="550" y="300" width="160" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Зв'язки -->
        <mxCell id="rel1" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="class1" target="class4">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel2" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="class4" target="class5">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel3" value="" style="endArrow=none;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="class2" target="class5">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel4" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="class2" target="class3">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel5" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="class1" target="class6">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel6" value="" style="endArrow=none;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="class2" target="class6">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="400" as="sourcePoint"/>
            <mxPoint x="430" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
  
  <diagram name="Діаграма компонентів" id="component-diagram">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Frontend компоненти -->
        <mxCell id="comp1" value="&lt;&lt;component&gt;&gt;&#xa;Web Interface&#xa;(Blade Templates)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="comp2" value="&lt;&lt;component&gt;&gt;&#xa;CSS Framework&#xa;(Tailwind CSS)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="250" y="50" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="comp3" value="&lt;&lt;component&gt;&gt;&#xa;JavaScript&#xa;(Frontend Logic)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="450" y="50" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Backend компоненти -->
        <mxCell id="comp4" value="&lt;&lt;component&gt;&gt;&#xa;Laravel Framework&#xa;(MVC Architecture)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="50" y="200" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="comp5" value="&lt;&lt;component&gt;&gt;&#xa;Controllers&#xa;(Request Handlers)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="250" y="200" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="comp6" value="&lt;&lt;component&gt;&gt;&#xa;Models&#xa;(Data Layer)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="450" y="200" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Сервіси -->
        <mxCell id="comp7" value="&lt;&lt;component&gt;&gt;&#xa;Services&#xa;(Business Logic)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fad7ac;strokeColor=#b46504;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="50" y="350" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="comp8" value="&lt;&lt;component&gt;&gt;&#xa;Image Service&#xa;(Image Management)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=#0e8088;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="250" y="350" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <!-- База даних -->
        <mxCell id="comp9" value="&lt;&lt;component&gt;&gt;&#xa;SQLite Database&#xa;(Data Storage)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="450" y="350" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Зовнішні API -->
        <mxCell id="comp10" value="&lt;&lt;component&gt;&gt;&#xa;External APIs&#xa;(Rozetka, DuckDuckGo)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcc99;strokeColor=#36393d;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="250" y="500" width="150" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Зв'язки -->
        <mxCell id="rel1" value="" style="endArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp1" target="comp4">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel2" value="" style="endArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp4" target="comp5">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel3" value="" style="endArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp5" target="comp6">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel4" value="" style="endArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp6" target="comp9">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel5" value="" style="endArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp5" target="comp7">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel6" value="" style="endArrow=classic;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp7" target="comp8">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="rel7" value="" style="endArrow=classic;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="comp8" target="comp10">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="380" y="350" as="sourcePoint"/>
            <mxPoint x="430" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
  
  <diagram name="Діаграма послідовності" id="sequence-diagram">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Актори та об'єкти -->
        <mxCell id="actor1" value="Користувач" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
        
        <mxCell id="actor2" value="Веб-інтерфейс" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="200" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
        
        <mxCell id="actor3" value="Контролер" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="350" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
        
        <mxCell id="actor4" value="Модель" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="500" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
        
        <mxCell id="actor5" value="База даних" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="650" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
        
        <!-- Повідомлення -->
        <mxCell id="msg1" value="Натискає Додати в кошик" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="100" y="150" as="sourcePoint"/>
            <mxPoint x="250" y="150" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg2" value="POST /cart/add" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="250" y="200" as="sourcePoint"/>
            <mxPoint x="400" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg3" value="validate(request)" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="400" y="250" as="sourcePoint"/>
            <mxPoint x="400" y="280" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg4" value="create(cartItem)" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="400" y="320" as="sourcePoint"/>
            <mxPoint x="550" y="320" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg5" value="INSERT INTO cart_items" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="550" y="370" as="sourcePoint"/>
            <mxPoint x="700" y="370" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg6" value="success" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="700" y="420" as="sourcePoint"/>
            <mxPoint x="550" y="420" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg7" value="cartItem" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="550" y="470" as="sourcePoint"/>
            <mxPoint x="400" y="470" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg8" value="redirect to cart" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="400" y="520" as="sourcePoint"/>
            <mxPoint x="250" y="520" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="msg9" value="оновлена сторінка кошика" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="250" y="570" as="sourcePoint"/>
            <mxPoint x="100" y="570" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
  
</mxfile>`;

    return xml;
}

// Generate the file
const drawioXML = createDrawioFile();

// Write to file
fs.writeFileSync('Kosyanchuk_Diagrams_Final.drawio', drawioXML, 'utf8');

console.log('✅ Успішно створено валідний файл draw.io: Kosyanchuk_Diagrams_Final.drawio');
console.log('📋 Файл містить 4 діаграми:');
console.log('   1. Діаграма випадків використання');
console.log('   2. Діаграма класів');
console.log('   3. Діаграма компонентів');
console.log('   4. Діаграма послідовності');
console.log('');
console.log('🔧 Для використання:');
console.log('   1. Відкрийте https://app.diagrams.net/');
console.log('   2. Натисніть "Open Existing Diagram"');
console.log('   3. Завантажте файл Kosyanchuk_Diagrams_Final.drawio');
console.log('   4. Переключайтеся між діаграмами через вкладки внизу');
