# Highlights Post for NodeBB


Plugin para resaltar los posts de ciertos usuarios.  

* Post del OP  
* Post de personas que sigues  

Requiere hacer modificaciones en la plantilla `topic.tpl`

Buscar la línea

```
	<!-- BEGIN posts -->
	<li class="post-row<!-- IF posts.deleted --> deleted<!-- ENDIF posts.deleted -->" ...></li>
```

Y añadir `<!-- IF posts.isOP -->highlights-op<!-- ENDIF posts.isOP -->` en el atributo `class`:

```
	<li class="post-row<!-- IF posts.deleted --> deleted<!-- ENDIF posts.deleted --><!-- IF posts.isOP -->highlights-op<!-- ENDIF posts.isOP -->"...></li>
```
