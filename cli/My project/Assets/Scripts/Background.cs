using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Background : MonoBehaviour
{
    private float moveSpeed = 3f;

    void Update()
    {
        // 매 프레임 호출
        transform.position += Vector3.down * moveSpeed * Time.deltaTime;
        if (transform.position.y < -10) { 

            transform.position += new Vector3(0, 20f, 0);

        }
    }
}
